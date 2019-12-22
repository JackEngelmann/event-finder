import express from 'express'
import http from 'http'
import { AppContext } from '../appContext'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import { Connection, getConnection, createConnection } from 'typeorm'
import { createDbConnection } from '../database/database'
import { databaseConfig } from '../../databaseConfig'
import { applyDbScripts } from '../database/applyDbScripts'
import { AppliedScriptDataModel } from '../database/entity/appliedScripts'
import { ClubDataModel } from '../database/entity/club'
import { EventDataModel } from '../database/entity/event'
import { EventGenreDataModel } from '../database/entity/eventGenre'
import { GenreDataModel } from '../database/entity/genre'
import { ImageDataModel } from '../database/entity/image'
import { UserDataModel } from '../database/entity/user'
import { EventImageDataModel } from '../database/entity/eventImage'
import { ClubImageDataModel } from '../database/entity/clubImage'

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

const dbPromise = createDbConnection()

export async function createApolloTestServer(options: {
    isAdmin: boolean
    dbName: string
}) {
    return new Promise<ApolloTestServer>(async (resolve, reject) => {
        let db = await dbPromise
        const appContext: AppContext = {
            db,
            isAdmin: options.isAdmin,
        }
        await db.synchronize(true)
        await insertTestData(db)
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            context: appContext,
        })
        const client = createTestClient(server)

        async function destroy() {
            await server.stop()
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
        const db = await dbPromise
        await db.createQueryRunner().dropDatabase('lieblingsclubtest')
        await db.createQueryRunner().createDatabase('lieblingsclubtest')
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
            if (httpServer) {
                await new Promise(resolve => httpServer.close(() => resolve()))
            }
            // return await destroyTestDb(options.dbName)
        }

        resolve({ destroy, httpServer, appContext, port, server })
    })
}
