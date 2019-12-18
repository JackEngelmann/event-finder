import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import express from 'express'
import http, { Server } from 'http'
import { AppContext } from '../appContext'
import passport from 'passport'
import { ImageService } from '../service/imageService'
import { ImageModel, ImageDataModel } from '../database/entity/image'
import { UserModel, UserDataModel } from '../database/entity/user'
import session from 'express-session'
import bodyParser from 'body-parser'
import { SECRET, createAuthenticationStrategy } from '../authentication'
import { connectionPromise } from '../database/database'
import { Logger } from "../logger"

const logger = new Logger()

const PORT = process.env.PORT || 5000

const app = express()

/**
 * express middlewares
 */

app.use(session({ secret: SECRET }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

/**
 * authentication
 */

passport.use(createAuthenticationStrategy(connectionPromise))
passport.serializeUser((user: UserDataModel, done) =>
    done(null, user.id)
)
passport.deserializeUser(async (id: number, done) => {
    try {
        const connection = await connectionPromise
        const userModel = new UserModel(connection)
        const user = await userModel.getUser(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

/**
 * routes
 */

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/#/admin',
        failureRedirect: '/#/login',
    }),
)

app.get('/images/:imageId', async (req, res) => {
    const connection = await connectionPromise
    const imageId = parseInt(req.params.imageId, 10)
    logger.info(`requesting image with id ${imageId}`)
    const imageModel = new ImageModel(connection)
    const imageService = new ImageService(imageModel)
    if (Number.isNaN(imageId)) return null
    const file = await imageService.readFile(imageId)
    if (!file) return res.send(undefined)
    res.type(file.type)
    res.send(file.data)
})

/**
 * GraphQL (implemented using apollo-server)
 */

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async req => {
        const isAdmin = Boolean(req.req.user)
        const connection = await connectionPromise
        const appContext: AppContext = {
            db: connection,
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

/**
 * Imperatives to start and stop the server
 * (used for testing, hot-reloading)
 */

export async function startServer() {
    expressServer = http.createServer(app).listen({ port: PORT }, () => {
        console.log('started')
    })
}

export async function stopServer() {
    if (expressServer) expressServer.close()
}
