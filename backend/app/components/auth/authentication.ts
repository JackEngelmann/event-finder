import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import session from 'express-session'
import { AppContext } from '../../infrastructure/appContext'
import { Strategy } from 'passport-local'
import { UserDataModel, UserRepository } from './orm/user'
import passport from 'passport'
import { Express } from 'express'
import { getConnection } from 'typeorm'

const BCRYPT_SALT_ROUNDS = 11
const ADMIN_PASSWORD_PLAINTEXT = 'alexfalcojack'
const SECRET = 'wJK[>PDG8n|tuRd'

export async function getAdminPassword() {
    return bcrypt.hash(ADMIN_PASSWORD_PLAINTEXT, BCRYPT_SALT_ROUNDS)
}

export function requireAdminPermission(appContext: AppContext) {
    if (!appContext.isAdmin) {
        throw new Error('You need to be logged in as admin to mutate data')
    }
}

async function isSamePassword(password1: string, password2: string) {
    return await bcrypt.compare(password1, password2)
}

const createAuthenticationStrategy = () =>
    new Strategy(async function(userName, password, done) {
        try {
            const user = await getConnection()
                .getCustomRepository(UserRepository)
                .findUserByName(userName)
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            if (await isSamePassword(password, user.password)) {
                return done(null, user)
            }
            return done(null, false, { message: 'Incorrect password' })
        } catch (err) {
            return done(err)
        }
    })

export function initializePassportAuthentication(app: Express) {
    app.use(session({ secret: SECRET }))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(createAuthenticationStrategy())
    passport.serializeUser((user: UserDataModel, done) => done(null, user.id))
    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await getConnection()
                .getCustomRepository(UserRepository)
                .findOneOrFail(id)
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })
    return passport
}
