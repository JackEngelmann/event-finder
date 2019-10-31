import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { db } from '../database'
import { resolvers } from './resolvers'
import express from 'express'
import http, { Server } from 'http'

const PORT = 5000

const app = express()

app.use(express.static('public'))

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
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


