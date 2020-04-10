import {
    eventFragment,
    ApolloTestServer,
    createApolloTestServer,
} from './utils'
import { EventModel } from '../../app/components/event/orm/event'
import moment = require('moment')

const DB_NAME = 'eventquerydb'

let apolloTestServer: ApolloTestServer | undefined

beforeEach(async done => {
    apolloTestServer = await createApolloTestServer({
        isAdmin: false,
        dbName: DB_NAME,
        insertTestData: true,
    })
    done()
})

afterEach(async done => {
    if (apolloTestServer) await apolloTestServer.destroy()
    apolloTestServer = undefined
    done()
})

describe('event queries: ', () => {
    test('events correctly', async done => {
        const result = await apolloTestServer!.client.query({
            query: `{
                events { ${eventFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('existing event correctly', async done => {
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
        done()
    })
    test('filter events by club', async done => {
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        const eventModel = new EventModel(apolloTestServer.appContext.db)
        await eventModel.createEvent({
            clubId: 1,
            name: 'club-1-1',
            date: moment().toISOString(),
        })
        await eventModel.createEvent({
            clubId: 1,
            name: 'club-1-2',
            date: moment().toISOString(),
        })
        await eventModel.createEvent({
            clubId: 2,
            name: 'club-2-1',
            date: moment().toISOString(),
        })
        await eventModel.createEvent({
            clubId: 2,
            name: 'club-2-2',
            date: moment().toISOString(),
        })
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
        done()
    })
    test('not existing event and return undefined', async done => {
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
        done()
    })
})
