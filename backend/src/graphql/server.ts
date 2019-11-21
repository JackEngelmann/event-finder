import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import express from 'express'
import http, { Server } from 'http'
import { createDatabase } from '../database/database'
import { AppContext } from '../appContext'
import { ImageService } from '../service/imageService'
import { ImageModel } from '../database/models/image'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

const db = createDatabase()

app.get('/images/:imageId', async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    if (Number.isNaN(imageId)) return null
    const file = await imageService.readFile(imageId);
    if (!file) return res.send(undefined)
    res.type(file.type)
    res.send(file.data)
})

const appContext: AppContext = { db }

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: appContext,
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


