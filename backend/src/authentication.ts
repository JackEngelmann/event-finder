import bcrypt from 'bcrypt'
import { AppContext } from './appContext'
import { Strategy } from 'passport-local'
import { UserModel } from './database/entity/user'
import { Connection } from 'typeorm'

export const BCRYPT_SALT_ROUNDS = 11
export const ADMIN_PASSWORD_PLAINTEXT = 'alexfalcojack'
export const SECRET = 'wJK[>PDG8n|tuRd'

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

export const createAuthenticationStrategy = (
    connectionPromise: Promise<Connection>
) =>
    new Strategy(async function(userName, password, done) {
        const connection = await connectionPromise
        const userModel = new UserModel(connection)
        try {
            const user = await userModel.getUserByName(userName)
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
