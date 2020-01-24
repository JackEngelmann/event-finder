import { clubFragment, ApolloTestServer, createApolloTestServer } from './utils'

let apolloTestServer: ApolloTestServer | undefined

const DB_NAME = 'clubquerydb'

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

describe('club queries', () => {
    test('clubs correctly', async done => {
        const result = await apolloTestServer!.client.query({
            query: `{
                clubs { ${clubFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('existing club correctly', async done => {
        const result = await apolloTestServer!.client.query({
            query: `
                query clubById($id: Int!) {
                    club(id: $id) { ${clubFragment} }
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
})
