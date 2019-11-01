import { ApolloServer } from "apollo-server-express"
import { createTestDb } from "../database/database"
import { insertTestData, eventFragment } from "./utils"
import { createTestClient, ApolloServerTestClient } from "apollo-server-testing"
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { CreateEventInput } from "../mutations/createEvent"

let server: ApolloServerTestClient | undefined = undefined

beforeEach(() => {
    const newServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: async () => {
            const db = await createTestDb()
            await insertTestData(db)
            return { db }
        },
    })

    server = createTestClient(newServer)
})

test('create an event with only required information', async done => {
    const input: CreateEventInput = {
        name: 'event-name',
        date: 'event-date',
        clubId: 1,
    }
    const result = await server!.mutate({
        mutation: `
            mutation CreateEvent($input: CreateEventInput!) {
                createEvent(input: $input) {
                    event {
                        ${eventFragment}
                    }
                }
            }
        `,
        variables: { input },
    })
    expect(result).toMatchSnapshot()
    done()
})
