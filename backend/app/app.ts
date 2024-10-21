import 'reflect-metadata'
import express from 'express'
import { initializePassportAuthentication } from './components/auth/authentication'
import { applyDbScripts } from './components/scripts/commands/applyDbScripts'
import routes from './routes'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './infrastructure/schema'
import { resolvers } from './infrastructure/resolvers'
import { AppContext } from './infrastructure/appContext'
import { UserDataModel } from './components/auth/orm/user'
import { getConnection } from 'typeorm'
import { createDbConnection, getMigrations, getSeeds } from './infrastructure/database'
import logger from './infrastructure/logger'

let app = express()

initializePassportAuthentication(app)

app.use(routes)
app.use(express.static("public"))

export const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async req => {
        const isAdmin = Boolean(req.req.user)
        const connection = getConnection()
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

createDbConnection()
    .then(() => applyDbScripts(getMigrations()))
    .then(() => applyDbScripts(getSeeds()))
    .catch(err => logger.error(err))

export default app

