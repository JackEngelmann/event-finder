import {
    genreFragment,
    ApolloTestServer,
    createApolloTestServer,
} from './utils'

let apolloTestServer: ApolloTestServer | undefined

const DB_NAME = 'genresquerydb'

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
    test('genres correctly', async done => {
        const result = await apolloTestServer!.client.query({
            query: `
            {
                genres { ${genreFragment} }
            }
            `,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
})
