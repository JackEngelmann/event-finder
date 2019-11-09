import { ApolloServer } from 'apollo-server-express'
import { createTestDb } from '../database/database'
import { insertTestData, eventFragment, clubFragment } from './utils'
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { CreateEventInput, createEvent } from '../mutations/createEvent'
import { UpdateEventInput } from '../mutations/updateEvent'
import { Database } from 'sqlite3'
import { queryEvent } from '../queries/event'
import { AppContext } from '../appContext'
import { CreateClubInput, createClub } from '../mutations/createClub'
import { UpdateClubInput } from '../mutations/updateClub'
import { queryClub } from '../queries/club'
import { deleteEvent } from '../mutations/deleteEvent'
import { deleteClub } from '../mutations/deleteClub'

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
        context: { db },
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
        genreIds: [],
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
        amountOfFloors: 3,
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
    expect(result.data).toBeDefined()
    expect(result.data!.updateEvent).toBeDefined()
    expect(result.data!.updateEvent.event).toBeNull()
    done()
})

test('update an event with empty genre list', async done => {
    const input: UpdateEventInput = {
        id: 1,
        name: 'updated-name',
        date: 'updated-date',
        clubId: 2,
        genreIds: [],
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
        amountOfFloors: 2,
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
        variables: { id },
    })

    const deletedEvent = await queryEvent(appContext, id)
    expect(deletedEvent).toBeUndefined()
    done()
})

test('create club with only required information', async done => {
    const input: CreateClubInput = {
        name: 'test',
    }

    const result = await server!.mutate({
        mutation: `
            mutation CreateClub($input: CreateClubInput!) {
                createClub(input: $input) {
                    club { ${clubFragment} }
                }
            }
        `,
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
        mutation: `
            mutation CreateClub($input: CreateClubInput!) {
                createClub(input: $input) {
                    club { ${clubFragment} }
                }
            }
        `,
        variables: { input },
    })
    expect(result.data).toBeDefined()
    expect(result).toMatchSnapshot()
    done()
})

test('update club with only required information', async done => {
    const input: UpdateClubInput = {
        name: 'updated-name',
        id: 1,
    }

    const result = await server!.mutate({
        mutation: `
            mutation UpdateClub($input: UpdateClubInput!) {
                updateClub(input: $input) {
                    club { ${clubFragment} }
                }
            }
        `,
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
        mutation: `
            mutation UpdateClub($input: UpdateClubInput!) {
                updateClub(input: $input) {
                    club { ${clubFragment} }
                }
            }
        `,
        variables: { input },
    })
    expect(result.errors).toBeUndefined()
    expect(result.data).toBeDefined()
    expect(result).toMatchSnapshot()
    done()
})

test('delete club', async done => {
    // arrange
    const clubId = await createClub(appContext, {
        name: 'test'
    })
    const club = await queryClub(appContext, clubId)
    expect(club).toBeDefined()

    // act
    const result = await server!.mutate({
        mutation: `
            mutation DeleteClub($id: Int!) {
                deleteClub(id: $id) {
                    id
                }
            }
        `,
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
        name: 'test'
    })
    const club = await queryClub(appContext, clubId)
    expect(club).toBeDefined()
    const connectedEventId = await createEvent(appContext, {
        clubId,
        name: 'connected event',
        date: 'some date',
    })
    const connectedEvent = await queryEvent(appContext, connectedEventId)
    expect(connectedEvent).toBeDefined()

    // act
    const result = await server!.mutate({
        mutation: `
            mutation DeleteClub($id: Int!) {
                deleteClub(id: $id) {
                    id
                }
            }
        `,
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

