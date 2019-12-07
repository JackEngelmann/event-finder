import express from 'express'
import http from 'http'
import { AppContext } from '../appContext'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import { Connection } from 'typeorm'
import { createDbConnection } from '../database/database'

/**
 * GraphQL utils
 */

export const genreFragment = `
    id
    name
`

export const eventFragment = `
    club {
        id
        name
    }
    name,
    description,
    date,
    id
    imageUrl,
    priceCategory,
    admissionFee,
    admissionFeeWithDiscount,
    link
    special,
    minimumAge,
    amountOfFloors
    genres {
        ${genreFragment}
    }
`

export const clubFragment = `
    address
    contact
    description
    email
    id
    link
    imageUrl
    name
    region
    specials
`

export async function insertTestData(connection: Connection) {
    await connection.query(`
        INSERT INTO club (
            name,
            address,
            region,
            contact,
            email,
            specials,
            description,
            link
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description',
            'link'
        )
    `)
    await connection.query(`
        INSERT INTO club (
            name,
            address,
            region,
            contact,
            email,
            specials,
            description,
            link
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description',
            'link'
        )
    `)
    await connection.query(`
        INSERT INTO event
        (
            name,
            description,
            date,
            clubId,
            imageUrl,
            priceCategory,
            admissionFee,
            admissionFeeWithDiscount,
            special,
            minimumAge,
            amountOfFloors
        ) 
        VALUES (
            'name',
            'description',
            'date',
            1,
            'imageUrl',
            2,
            10.0,
            20.0,
            'specials',
            18,
            4
        )
    `)
    await connection.query(`
        INSERT INTO genre (name) VALUES
            ('genre1'),
            ('genre2'),
            ('genre3')
    `)
    return connection.query(`
        INSERT INTO eventgenre (eventId, genreId) VALUES (1, 1)
    `)
}

/**
 * ApolloTestClient
 */

export type ApolloTestServer = {
    server: ApolloServer
    appContext: AppContext
    client: ApolloServerTestClient
    destroy: () => Promise<unknown>
}

export async function createApolloTestServer(options: {
    isAdmin: boolean
    dbName: string
}) {
    return new Promise<ApolloTestServer>(async (resolve, reject) => {
        const db = await createDbConnection(options.dbName)
        const appContext: AppContext = {
            db,
            isAdmin: options.isAdmin,
        }
        await insertTestData(db)
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            context: appContext,
        })
        const client = createTestClient(server)

        async function destroy() {
            await db.dropDatabase()
            await db.close()
            // return await destroyTestDb(options.dbName)
        }

        resolve({ destroy, server, appContext, client })
    })
}


/**
 * ApolloTestHttpServer
 */

export type ApolloHttpTestServer = {
    httpServer: http.Server
    appContext: AppContext
    port: number
    server: ApolloServer
    destroy: () => Promise<unknown>
}

export async function createApolloHttpTestServer(options: {
    isAdmin: boolean
    dbName: string
}) {
    return new Promise<ApolloHttpTestServer>(async (resolve, reject) => {
        const db = await createDbConnection(options.dbName)
        const appContext: AppContext = {
            db,
            isAdmin: options.isAdmin,
        }
        await insertTestData(db)
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            context: appContext,
        })
        const app = express()
        server.applyMiddleware({ app })
        const httpServer = await new Promise<http.Server>(resolve => {
            const l: http.Server = app.listen({ port: 0 }, () => resolve(l))
        })
        const port = (httpServer.address() as { port: number }).port

        async function destroy() {
            if (server) await server.stop()
            if (httpServer) await httpServer.close()
            await db.dropDatabase()
            await db.close()
            // return await destroyTestDb(options.dbName)
        }

        resolve({ destroy, httpServer, appContext, port, server })
    })
}
