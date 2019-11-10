import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import express from 'express'
import http, { Server } from 'http'
import { createDatabase } from '../database/database'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        const db = await createDatabase()
        return db
    },
    playground: true,
    introspection: true
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


