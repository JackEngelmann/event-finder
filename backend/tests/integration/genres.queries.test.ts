import {
    genreFragment,
    ApolloTestServer,
    createApolloTestServer,
} from '../utils'

let apolloTestServer: ApolloTestServer | undefined

const DB_NAME = 'genresquerydb'

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

describe('club queries', () => {
    test('genres correctly', async () => {
        const result = await apolloTestServer!.client.query({
            query: `
            {
                genres { ${genreFragment} }
            }
            `,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
    })
})
