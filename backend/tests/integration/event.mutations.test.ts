import {
    eventFragment,
    ApolloHttpTestServer,
    ApolloTestServer,
    createApolloTestServer,
} from '../utils'
import { CreateEventInput } from '../../src/event/commands/createEvent'
import { UpdateEventInput } from '../../src/event/commands/updateEvent'
import { queryEvent } from '../../src/event/queries/event'

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

beforeEach(async () => {
    apolloTestServer = await createApolloTestServer({
        isAdmin: false,
        dbName: DB_NAME,
        insertTestData: true,
    })
})

afterEach(async () => {
    if (apolloTestServer) await apolloTestServer.destroy()
    apolloTestServer = undefined
})

describe('event mutations: ', () => {
    describe('create event', () => {
        test('create an event with only required information', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('create an event with empty genres', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('create an event with all fields', async () => {
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const input: CreateEventInput = {
                name: 'event-name',
                description: 'event-description',
                date: 'event-date',
                clubId: 1,
                genreIds: [1, 2],
                special: 'event-special',
                imageUrls: ['image-url-1', 'image-url-2'],
                priceCategory: 2,
                admissionFee: 10.0,
                admissionFeeWithDiscount: 4.0,
                minimumAge: 18,
                links: [{ href: 'link', type: 'FACEBOOK' }],
                amountOfFloors: 3,
            }
            const result = await apolloTestServer.client.mutate({
                mutation: createEventMutation,
                variables: { input },
            })
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
        })

        test('create an event without permission shoul yield error', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: false,
                dbName: DB_NAME,
                insertTestData: true,
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
        })
    })

    describe('update event', () => {
        test('to only have required fields', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('return null for event when updating a non-existent event', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('with empty genre list', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('with all fields', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: true,
                insertTestData: true,
            })
            const input: UpdateEventInput = {
                id: 1,
                name: 'updated-name',
                date: 'updated-date',
                clubId: 2,
                description: 'updated-description',
                genreIds: [2, 3],
                imageUrls: ['image-url-1', 'image-url-2'],
                special: 'updated-special',
                priceCategory: 1,
                admissionFee: 20.0,
                admissionFeeWithDiscount: 3.0,
                minimumAge: 16,
                amountOfFloors: 2,
                links: [{ href: 'updated-link', type: 'FACEBOOK' }],
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateEventMutation,
                variables: { input },
            })

            // assert
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
        })

        test('without permission should yield error', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: false,
                dbName: DB_NAME,
                insertTestData: true,
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
        })

        test('with emojis in description', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
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
            expect(result.data!.updateEvent.event.description).toBe(
                emojiDescription
            )
            expect(result).toMatchSnapshot()
        })
    })

    describe('delte event', () => {
        test('delete an event', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: true,
                insertTestData: true,
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
        })

        test('without permission should yield error', async () => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: false,
                insertTestData: true,
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
        })
    })
})
