import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import express from 'express'
import bcrypt from 'bcrypt'
import http, { Server } from 'http'
import { createDatabase } from '../database/database'
import { AppContext } from '../appContext'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { ImageService } from '../service/imageService'
import { ImageModel } from '../database/models/image'
import { UserModel, UserDataModel } from '../database/models/user'
import session from 'express-session'
import bodyParser from 'body-parser'
import { SECRET, isSamePassword } from '../permissionUtils'

const PORT = process.env.PORT || 5000

const db = createDatabase()
const app = express()

app.use(express.static('public'))
app.use(session({ secret: SECRET }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

// TODO: refactor -> there shouldn't be so much logic in this file

passport.use(
    new Strategy(async function(userName, password, done) {
        const userModel = new UserModel(db)
        try {
            const user = await userModel.getUserByName(userName)
            if (!user) return done(null, false)
            if (await isSamePassword(user.password, password)) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

passport.serializeUser((user: UserDataModel, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const userModel = new UserModel(db)
        const user = await userModel.getUser(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

app.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/#/login',
        successRedirect: '/#/admin',
    }),
    (req, res) => res.redirect('/#/login')
)

app.get('/images/:imageId', async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10)
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    if (Number.isNaN(imageId)) return null
    const file = await imageService.readFile(imageId)
    if (!file) return res.send(undefined)
    res.type(file.type)
    res.send(file.data)
})

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: req => {
        const isAdmin = Boolean(req.req.user)
        const appContext: AppContext = {
            db,
            isAdmin,
            user: req.req.user as UserDataModel,
        }
        return appContext
    },
    playground: true,
    introspection: true,
})

apolloServer.applyMiddleware({ app })

let expressServer: Server | null = null

export async function startServer() {
    expressServer = http.createServer(app).listen({ port: PORT }, () => {
        console.log('started')
    })
}

export async function stopServer() {
    if (expressServer) expressServer.close()
}
