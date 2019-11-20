import fetch from 'node-fetch'
import express from 'express'
import http from 'http'
import FormData from 'form-data'
import { ApolloServer } from 'apollo-server-express'
import { createTestDb, Database, destroyTestDb } from '../database/database'
import { insertTestData, clubFragment } from './utils'
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { createEvent } from '../mutations/createEvent'
import { queryEvent } from '../queries/event'
import { AppContext } from '../appContext'
import { CreateClubInput, createClub } from '../mutations/createClub'
import { UpdateClubInput } from '../mutations/updateClub'
import { queryClub } from '../queries/club'
import { createReadStream } from 'fs'
import { join } from 'path'
import { GraphQLResponse } from 'apollo-server-core'

const DB_NAME = 'clubmutationdb'

const createClubMutation = `
    mutation CreateClub($input: CreateClubInput!) {
        createClub(input: $input) {
            club { ${clubFragment} }
        }
    }
`
const updateClubMutation = `
    mutation UpdateClub($input: UpdateClubInput!) {
        updateClub(input: $input) {
            club { ${clubFragment} }
        }
    }
`
const deleteClubMutation = `
    mutation DeleteClub($id: Int!) {
        deleteClub(id: $id) {
            id
        }
    }
`

describe('club mutations: ', () => {
    let server: ApolloServerTestClient | undefined = undefined
    let db: Database | undefined = undefined
    let appContext: AppContext = { db: db! }

    beforeEach(async done => {
        const newDb = await createTestDb(DB_NAME)
        db = newDb
        appContext = { db: newDb }
        await insertTestData(newDb)
        const newServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: { db: newDb },
        })
        server = createTestClient(newServer)
        done()
    })

    afterEach(async done => {
        await destroyTestDb(DB_NAME)
        done()
    })

    describe('create', () => {
        test('create club with only required information', async done => {
            const input: CreateClubInput = {
                name: 'test',
            }

            const result = await server!.mutate({
                mutation: createClubMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create club with all information', async done => {
            const input: CreateClubInput = {
                address: 'address',
                contact: 'contact',
                description: 'description',
                email: 'email',
                link: 'link',
                name: 'test',
                region: 'region',
                specials: 'speicals',
            }

            const result = await server!.mutate({
                mutation: createClubMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('update', () => {
        test('update club with only required information', async done => {
            const input: UpdateClubInput = {
                name: 'updated-name',
                id: 1,
            }

            const result = await server!.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('update club with all information', async done => {
            const input: UpdateClubInput = {
                address: 'updated-address',
                contact: 'updated-contact',
                description: 'updated-description',
                email: 'updated-email',
                id: 1,
                link: 'updated-link',
                name: 'updated-test',
                region: 'updated-region',
                specials: 'updated-speicals',
            }

            const result = await server!.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('delete', () => {
        test('delete club', async done => {
            // arrange
            const clubId = await createClub(appContext, {
                name: 'test',
            })
            const club = await queryClub(appContext, clubId)
            expect(club).toBeDefined()

            // act
            const result = await server!.mutate({
                mutation: deleteClubMutation,
                variables: { id: clubId },
            })

            // assert
            expect(result.errors).toBeUndefined()
            const deletedClub = await queryClub(appContext, clubId)
            expect(deletedClub).toBeUndefined()
            done()
        })

        test('when deleting an event, the events the club did should be deleted too', async done => {
            // arrange
            const clubId = await createClub(appContext, {
                name: 'test',
            })
            const club = await queryClub(appContext, clubId)
            expect(club).toBeDefined()
            const connectedEventId = await createEvent(appContext, {
                clubId,
                name: 'connected event',
                date: 'some date',
            })
            const connectedEvent = await queryEvent(
                appContext,
                connectedEventId
            )
            expect(connectedEvent).toBeDefined()

            // act
            const result = await server!.mutate({
                mutation: deleteClubMutation,
                variables: { id: clubId },
            })

            // assert
            expect(result.errors).toBeUndefined()
            const deletedClub = await queryClub(appContext, clubId)
            expect(deletedClub).toBeUndefined()
            const deletedEvent = await queryEvent(appContext, connectedEventId)
            expect(deletedEvent).toBeUndefined()
            done()
        })
    })
})

describe('club image field', () => {
    let server: ApolloServer
    let app: express.Application
    let httpServer: http.Server
    let port: number

    async function createServer() {
        const newDb = await createTestDb(DB_NAME)
        server = new ApolloServer({
            typeDefs,
            resolvers,
            context: { db: newDb },
        })
        app = express()
        server.applyMiddleware({ app })
        httpServer = await new Promise<http.Server>(resolve => {
            const l: http.Server = app.listen({ port: 0 }, () => resolve(l))
        })
        await insertTestData(newDb)
        port = (httpServer.address() as { port: number }).port
    }

    afterEach(async done => {
        if (server) await server.stop()
        if (httpServer) await httpServer.close()
        await destroyTestDb(DB_NAME)
        done()
    })

    test('update club with an image', async done => {
        await createServer()

        const input: any = {
            name: 'updated-name',
            id: 1,
            image: null,
        }

        const body = new FormData()
        body.append(
            'operations',
            JSON.stringify({
                query: updateClubMutation,
                variables: { input },
            })
        )
        body.append('map', JSON.stringify({ 1: ['variables.input.image'] }))
        body.append('1', createReadStream(join(__dirname, 'testPicture.jpg')))

        const result: GraphQLResponse = await fetch(`http://localhost:${port!}/graphql`, {
            method: 'POST',
            body: body as any,
        }).then(res => res.json())

        expect(result.errors).toBeUndefined()
        expect(result.data!.updateClub.club.imageUrl).toBeDefined()
        done()
    })

    test('create club with an image', async done => {
        await createServer()

        const input: any = {
            name: 'created-name',
            image: null,
        }

        const body = new FormData()
        body.append(
            'operations',
            JSON.stringify({
                query: createClubMutation,
                variables: { input },
            })
        )
        body.append('map', JSON.stringify({ 1: ['variables.input.image'] }))
        body.append('1', createReadStream(join(__dirname, 'testPicture.jpg')))

        const result: GraphQLResponse = await fetch(`http://localhost:${port!}/graphql`, {
            method: 'POST',
            body: body as any,
        }).then(res => res.json())

        expect(result.errors).toBeUndefined()
        expect(result.data!.createClub.club.imageUrl).toBeDefined()
        done()
    })
})
