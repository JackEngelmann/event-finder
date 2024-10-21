import express from 'express'
import http from 'http'
import { AppContext } from '../src/infrastructure/appContext'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../src/infrastructure/schema'
import { resolvers } from '../src/infrastructure/resolvers'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import { Connection, getConnection } from 'typeorm'
import { createDbConnection } from '../src/infrastructure/database'

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
    name
    description
    date
    id
    imageUrls
    priceCategory
    admissionFee
    admissionFeeWithDiscount
    links {
        href
        type
    }
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
    links {
        href
        type
    }
    imageUrls
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
            description
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description'
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
            description
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description'
        )
    `)
    await connection.query(`
        INSERT INTO event
        (
            name,
            description,
            date,
            clubId,
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
    insertTestData: boolean
}): Promise<ApolloTestServer> {
    await createDbConnection(options.dbName)
    let db = getConnection(options.dbName)
    const appContext: AppContext = {
        db,
        isAdmin: options.isAdmin,
    }
    await db.synchronize(true)
    if (options.insertTestData) {
        await insertTestData(db)
    }
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: appContext,
    })
    const client = createTestClient(server)

    async function destroy() {
        await server.stop()
    }

    return { destroy, server, appContext, client }
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
    insertTestData: boolean
    dbName: string
}): Promise<ApolloHttpTestServer> {
    await createDbConnection(options.dbName)
    const db = getConnection(options.dbName)
    await db.createQueryRunner().dropDatabase('lieblingsclubtest')
    await db.createQueryRunner().createDatabase('lieblingsclubtest')
    const appContext: AppContext = {
        db,
        isAdmin: options.isAdmin,
    }
    if (options.insertTestData) {
        await insertTestData(db)
    }
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
        if (httpServer) {
            await new Promise<void>(resolve => httpServer.close(() => resolve()))
        }
    }

    return { destroy, httpServer, appContext, port, server }
}
