import { ApolloServer } from "apollo-server-express"
import { createTestDb } from "../database/database"
import { insertTestData, eventFragment } from "./utils"
import { createTestClient, ApolloServerTestClient } from "apollo-server-testing"
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { CreateEventInput } from "../mutations/createEvent"
import { UpdateEventInput } from "../mutations/updateEvent"
import { Database } from "sqlite3"
import { queryEvent } from "../queries/event"
import { AppContext } from "../appContext"

let server: ApolloServerTestClient | undefined = undefined
let db: Database | undefined = undefined
let appContext: AppContext = { db: db! }

beforeEach(async done => {
    const db = await createTestDb()
    appContext = { db }
    await insertTestData(db)
    const newServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: { db }
    })
    server = createTestClient(newServer)
    done()
})

test('create an event with only required information', async done => {
    const input: CreateEventInput = {
        name: 'event-name',
        date: 'event-date',
        clubId: 1,
    }
    const result = await server!.mutate({
        mutation: `
            mutation CreateEvent($input: CreateEventInput!) {
                createEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
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
        genreIds: []
    }
    const result = await server!.mutate({
        mutation: `
            mutation CreateEvent($input: CreateEventInput!) {
                createEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
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
        amountOfFloors: 3
    }
    const result = await server!.mutate({
        mutation: `
            mutation CreateEvent($input: CreateEventInput!) {
                createEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
        variables: { input },
    })
    expect(result.data).toBeDefined()
    expect(result).toMatchSnapshot()
    done()
})

test('update an event to only have required fields', async done => {
    const input: UpdateEventInput = {
        id: 1,
        name: 'updated-name',
        date: 'updated-date',
        clubId: 2,
    }
    const result = await server!.mutate({
        mutation: `
            mutation UpdateEvent($input: UpdateEventInput!) {
                updateEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
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
        mutation: `
            mutation UpdateEvent($input: UpdateEventInput!) {
                updateEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
        variables: { input },
    })
    expect(result.data).toBeNull()
    done()
})

test('update an event with empty genre list', async done => {
    const input: UpdateEventInput = {
        id: 1,
        name: 'updated-name',
        date: 'updated-date',
        clubId: 2,
        genreIds: []
    }
    const result = await server!.mutate({
        mutation: `
            mutation UpdateEvent($input: UpdateEventInput!) {
                updateEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
        variables: { input },
    })
    expect(result.data).toBeDefined()
    expect(result).toMatchSnapshot()
    done()
})

test('update all fields of an event', async done => {
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
        amountOfFloors: 2
    }
    const result = await server!.mutate({
        mutation: `
            mutation UpdateEvent($input: UpdateEventInput!) {
                updateEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
        variables: { input },
    })
    expect(result.data).toBeDefined()
    expect(result).toMatchSnapshot()
    done()
})

test('delete an event', async done => {
    const id = 1

    const event = await queryEvent(appContext, id)
    expect(event).toBeDefined()

    await server!.mutate({
        mutation: `
            mutation DeleteEvent($id: Int!) {
                deleteEvent(id: $id) {
                    id
                }
            }
        `,
        variables: { id }
    })

    const deletedEvent = await queryEvent(appContext, id)
    expect(deletedEvent).toBeUndefined()
    done()
})
