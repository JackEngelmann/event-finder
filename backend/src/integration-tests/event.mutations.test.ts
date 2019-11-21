import fetch from 'node-fetch'
import express from 'express'
import http from 'http'
import FormData from 'form-data'
import { ApolloServer } from 'apollo-server-express'
import { createTestDb, Database, destroyTestDb } from '../database/database'
import { insertTestData, eventFragment, clubFragment } from './utils'
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { CreateEventInput } from '../mutations/createEvent'
import { UpdateEventInput } from '../mutations/updateEvent'
import { queryEvent } from '../queries/event'
import { AppContext } from '../appContext'
import { createReadStream } from 'fs'
import { join } from 'path'
import { GraphQLResponse } from 'apollo-server-core'

const DB_NAME = 'eventmutationdb'
const createEventMutation = `
    mutation CreateEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            event {
                ${eventFragment}
            }
        }
    }
`
const updateEventMutation = `
    mutation UpdateEvent($input: UpdateEventInput!) {
        updateEvent(input: $input) {
            event {
                ${eventFragment}
            }
        }
    }
`
const deleteEventMutation = `
    mutation DeleteEvent($id: Int!) {
        deleteEvent(id: $id) {
            id
        }
    }
`

describe('event mutations: ', () => {
    let server: ApolloServerTestClient | undefined = undefined
    let db: Database | undefined = undefined
    let appContext: AppContext = { db: db!, isAdmin: true }

    beforeEach(async done => {
        const newDb = await createTestDb(DB_NAME)
        db = newDb
        appContext = { db: newDb, isAdmin: true }
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

    describe('create event', () => {
        test('create an event with only required information', async done => {
            const input: CreateEventInput = {
                name: 'event-name',
                date: 'event-date',
                clubId: 1,
            }
            const result = await server!.mutate({
                mutation: createEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create an event with empty genres', async done => {
            const input: CreateEventInput = {
                name: 'event-name',
                date: 'event-date',
                clubId: 1,
                genreIds: [],
            }
            const result = await server!.mutate({
                mutation: createEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create an event with all fields', async done => {
            const input: CreateEventInput = {
                name: 'event-name',
                description: 'event-description',
                date: 'event-date',
                clubId: 1,
                genreIds: [1, 2],
                special: 'event-special',
                priceCategory: 2,
                admissionFee: 10.0,
                admissionFeeWithDiscount: 4.0,
                minimumAge: 18,
                link: 'http://www.some-link.de',
                amountOfFloors: 3,
            }
            const result = await server!.mutate({
                mutation: createEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('update event', () => {
        test('to only have required fields', async done => {
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
            }
            const result = await server!.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('return null for event when updating a non-existent event', async done => {
            const input: UpdateEventInput = {
                id: 10000,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
            }
            const result = await server!.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result.data!.updateEvent).toBeDefined()
            expect(result.data!.updateEvent.event).toBeNull()
            done()
        })

        test('with empty genre list', async done => {
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
                genreIds: [],
            }
            const result = await server!.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('with all fields', async done => {
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
                description: 'updated-description',
                genreIds: [2, 3],
                special: 'updated-special',
                priceCategory: 1,
                admissionFee: 20.0,
                admissionFeeWithDiscount: 3.0,
                minimumAge: 16,
                amountOfFloors: 2,
                link: 'http://www.some-link.de',
            }
            const result = await server!.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('delte event', () => {
        test('delete an event', async done => {
            const id = 1

            const event = await queryEvent(appContext, id)
            expect(event).toBeDefined()

            await server!.mutate({
                mutation: deleteEventMutation,
                variables: { id },
            })

            const deletedEvent = await queryEvent(appContext, id)
            expect(deletedEvent).toBeUndefined()
            done()
        })
    })
})

describe('event image field', () => {
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

    test('update event with an image', async done => {
        await createServer()

        const input: any = {
            id: 1,
            name: 'updated-name',
            date: 'updated-date',
            clubId: 2,
            image: null,
        }

        const body = new FormData()
        body.append(
            'operations',
            JSON.stringify({
                query: updateEventMutation,
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
        expect(result.data!.updateEvent.event.imageUrl).toBeDefined()
        done()
    })

    test('create event with an image', async done => {
        await createServer()

        const input: any = {
            name: 'created-name',
            date: 'created-date',
            clubId: 2,
            image: null,
        }

        const body = new FormData()
        body.append(
            'operations',
            JSON.stringify({
                query: createEventMutation,
                variables: { input },
            })
        )
        body.append('map', JSON.stringify({ 1: ['variables.input.image'] }))
        body.append('1', createReadStream(join(__dirname, 'testPicture.jpg')))

        const result: GraphQLResponse = await fetch(
            `http://localhost:${port!}/graphql`,
            {
                method: 'POST',
                body: body as any,
            }
        ).then(res => res.json())

        expect(result.errors).toBeUndefined()
        expect(result.data!.createEvent.event.imageUrl).toBeDefined()
        done()
    })
})
