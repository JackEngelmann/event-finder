import 'reflect-metadata'
import express from 'express'
import { initializePassportAuthentication } from './components/auth/authentication'
import { applyDbScripts } from './components/scripts/commands/applyDbScripts'
import { databaseConfig } from '../databaseConfig'
import routes from './routes'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './infrastructure/schema'
import { resolvers } from './infrastructure/resolvers'
import { getDbConnection } from './infrastructure/database'
import { AppContext } from './infrastructure/appContext'
import { UserDataModel } from './components/auth/orm/user'

const app = express()

applyDbScripts(databaseConfig)
initializePassportAuthentication(app)

app.use(routes)

export const apolloServer = new ApolloServer({
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

export default app
