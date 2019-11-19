import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { createTestDb, destroyTestDb } from '../database/database'
import { eventFragment, insertTestData } from './utils'

let server: ApolloServerTestClient | undefined

const DB_NAME = 'eventquerydb'

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

describe('event queries: ', () => {
    test('events correctly', async done => {
        const result = await server!.query({
            query: `{
                events { ${eventFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('existing event correctly', async done => {
        const result = await server!.query({
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
        const result = await server!.query({
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
