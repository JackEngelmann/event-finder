import {
    eventFragment,
    ApolloTestServer,
    createApolloTestServer,
} from '../utils'
import moment from 'moment'
import { createTestEvent } from '../utils/testBuilders'

const DB_NAME = 'eventquerydb'

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

describe('event queries: ', () => {
    test('events correctly', async () => {
        const result = await apolloTestServer!.client.query({
            query: `{
                events { ${eventFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
    })
    test('existing event correctly', async () => {
        const result = await apolloTestServer!.client.query({
            query: `
                query eventQuery($id: Int!) {
                    event(id: $id) { ${eventFragment} }
                }
            `,
            variables: {
                id: 1,
            },
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
    })
    test('filter events by club', async () => {
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        await createTestEvent()
            .setClubId(1)
            .setName('club-1-1')
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(1)
            .setName('club-1-2')
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(2)
            .setName('club-2-1')
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(2)
            .setName('club-2-2')
            .build(DB_NAME)
        const result = await apolloTestServer.client.query({
            query: `
                query eventsQuery($clubId: Int!) {
                    events(filter: { clubId: $clubId}) {
                        name
                    }
                }
            `,
            variables: {
                clubId: 1,
            },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data!.events.length).toBe(2)
        expect(result.data!.events.some((e: any) => (e.name = 'club-1-1')))
        expect(result.data!.events.some((e: any) => (e.name = 'club-1-2')))
    })
    test('not existing event and return undefined', async () => {
        const result = await apolloTestServer!.client.query({
            query: `
                query eventQuery($id: Int!) {
                    event(id: $id) { ${eventFragment} }
                }
            `,
            variables: {
                id: 2,
            },
        })
        expect(result.data!.event).toBeNull()
    })
})
