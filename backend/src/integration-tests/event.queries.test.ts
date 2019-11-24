import { eventFragment, ApolloTestServer, createApolloTestServer } from './utils'

const DB_NAME = 'eventquerydb'

let apolloTestServer: ApolloTestServer | undefined

beforeEach(async done => {
    apolloTestServer = await createApolloTestServer({
        isAdmin: false,
        dbName: DB_NAME,
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
