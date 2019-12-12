import fetch from 'node-fetch'
import FormData from 'form-data'
import {
    eventFragment,
    ApolloHttpTestServer,
    ApolloTestServer,
    createApolloTestServer,
    createApolloHttpTestServer,
} from './utils'
import { CreateEventInput } from '../mutations/createEvent'
import { UpdateEventInput } from '../mutations/updateEvent'
import { queryEvent } from '../queries/event'
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

let apolloTestServer: ApolloTestServer | undefined
let apolloHttpTestServer: ApolloHttpTestServer | undefined

afterEach(async done => {
    if (apolloHttpTestServer) await apolloHttpTestServer.destroy()
    if (apolloTestServer) await apolloTestServer.destroy()
    apolloTestServer = undefined
    apolloHttpTestServer = undefined
    done()
})

describe('event mutations: ', () => {
    describe('create event', () => {
        test('create an event with only required information', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const input: CreateEventInput = {
                name: 'event-name',
                date: 'event-date',
                clubId: 1,
            }
            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create an event with empty genres', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const input: CreateEventInput = {
                name: 'event-name',
                date: 'event-date',
                clubId: 1,
                genreIds: [],
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create an event with all fields', async done => {
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
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
            const result = await apolloTestServer.client.mutate({
                mutation: createEventMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create an event without permission shoul yield error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: false,
                dbName: DB_NAME,
            })
            const input: CreateEventInput = {
                name: 'event-name',
                date: 'event-date',
                clubId: 1,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeNull()
            expect(result.errors).toBeDefined()
            expect(result.errors).toMatchSnapshot()
            done()
        })

        test('create event with an image', async done => {
            apolloHttpTestServer = await createApolloHttpTestServer({
                dbName: DB_NAME,
                isAdmin: true
            })
            const { port } = apolloHttpTestServer

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
            body.append(
                '1',
                createReadStream(join(__dirname, 'testPicture.jpg'))
            )

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

    describe('update event', () => {
        test('to only have required fields', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('return null for event when updating a non-existent event', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const input: UpdateEventInput = {
                id: 10000,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result.data!.updateEvent).toBeDefined()
            expect(result.data!.updateEvent.event).toBeNull()
            done()
        })

        test('with empty genre list', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
                genreIds: [],
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('with all fields', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: true,
            })
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

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('update event with an image', async done => {
            // arrange
            apolloHttpTestServer = await createApolloHttpTestServer({
                dbName: DB_NAME,
                isAdmin: true,
            })
            const { port } = apolloHttpTestServer
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
            body.append(
                '1',
                createReadStream(join(__dirname, 'testPicture.jpg'))
            )

            // act
            const result: GraphQLResponse = await fetch(
                `http://localhost:${port!}/graphql`,
                {
                    method: 'POST',
                    body: body as any,
                }
            ).then(res => res.json())

            // assert
            expect(result.errors).toBeUndefined()
            expect(result.data!.updateEvent.event.imageUrl).toBeDefined()
            done()
        })

        test('without permission should yield error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: false,
                dbName: DB_NAME,
            })
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeNull()
            expect(result.errors).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('with emojis in description', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
            })
            const emojiDescription = '🍃🔝🎉📢👉🌵🎵'
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                description: emojiDescription,
                clubId: 2,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result.data!.updateEvent.event.description).toBe(emojiDescription)
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('delte event', () => {
        test('delete an event', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: true,
            })
            const { appContext, client } = apolloTestServer
            const id = 1

            const event = await queryEvent(appContext, id)
            expect(event).toBeDefined()

            // act
            await client.mutate({
                mutation: deleteEventMutation,
                variables: { id },
            })
            const deletedEvent = await queryEvent(appContext, id)

            // assert
            expect(deletedEvent).toBeUndefined()
            done()
        })

        test('without permission should yield error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: false,
            })
            const { client } = apolloTestServer

            // act
            const result = await client.mutate({
                mutation: deleteEventMutation,
                variables: { id: 1 },
            })

            // assert
            expect(result.data).toBeNull()
            expect(result.errors).toBeDefined()
            expect(result.errors).toMatchSnapshot()
            done()
        })
    })
})
