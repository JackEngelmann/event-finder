import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import express from 'express'
import http, { Server } from 'http'
import { AppContext } from './infrastructure/appContext'
import { UserDataModel } from './database/entity/user'
import { initializePassportAuthentication } from './infrastructure/authentication'
import { getDbConnection } from './database/database'
import { applyDbScripts } from './database/applyDbScripts'
import { databaseConfig } from '../databaseConfig'
import { initializeRoutes } from './routes/initializeRoutes'

const PORT = process.env.PORT || 5000

const app = express()

applyDbScripts(databaseConfig)
initializePassportAuthentication(app)
initializeRoutes(app)

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async req => {
        const isAdmin = Boolean(req.req.user)
        const connection = await getDbConnection()
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
