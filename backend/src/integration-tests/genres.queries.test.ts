import { ApolloServerTestClient, createTestClient } from "apollo-server-testing"
import { genreFragment, insertTestData } from "./utils"
import { createTestDb, destroyTestDb } from "../database/database"
import { ApolloServer } from "apollo-server-express"
import { resolvers } from '../graphql/resolvers'
import { typeDefs } from '../graphql/schema'

let server: ApolloServerTestClient | undefined

const DB_NAME = 'genresquerydb'

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
    test('genres correctly', async done => {
        const result = await server!.query({
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
