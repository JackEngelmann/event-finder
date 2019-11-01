import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { createTestDb } from '../database/database'
import { genreFragment, eventFragment, clubFragment, insertTestData } from './utils'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        const db = await createTestDb()
        await insertTestData(db)
        return { db }
    },
})

const { query } = createTestClient(server)

describe('should query', () => {
    test('clubs correctly', async done => {
        const result = await query({
            query: `{
                clubs { ${clubFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('events correctly', async done => {
        const result = await query({
            query: `{
                events { ${eventFragment} }
            }`,
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('genres correctly', async done => {
        const result = await query({
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
    test('existing club correctly', async done => {
        const result = await query({
            query: `
                query clubById($id: Int!) {
                    club(id: $id) { ${clubFragment} }
                }
            `,
            variables: {
                id: 1
            }
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('existing event correctly', async done => {
        const result = await query({
            query: `
                query eventQuery($id: Int!) {
                    event(id: $id) { ${eventFragment} }
                }
            `,
            variables: {
                id: 1
            }
        })
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()
        done()
    })
    test('not existing event and return undefined', async done => {
        const result = await query({
            query: `
                query eventQuery($id: Int!) {
                    event(id: $id) { ${eventFragment} }
                }
            `,
            variables: {
                id: 2
            }
        })
        expect(result.data!.event).toBeNull()
        done()
    })
})
