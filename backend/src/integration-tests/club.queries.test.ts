import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { createTestDb, destroyTestDb } from '../database/database'
import { clubFragment, insertTestData } from './utils'

let server: ApolloServerTestClient | undefined

const DB_NAME = 'clubquerydb'

beforeEach(async done => {
    const db = await createTestDb(DB_NAME)
    await insertTestData(db)
    const newServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: { db },
    })
    server = createTestClient(newServer)
    done()
})

afterEach(async done => {
    await destroyTestDb(DB_NAME)
    done()
})

describe('club queries', () => {
    test('clubs correctly', async done => {
        const result = await server!.query({
            query: `{
                clubs { ${clubFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('existing club correctly', async done => {
        const result = await server!.query({
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
