import { clubFragment, createApolloTestServer } from '../utils'
import moment from 'moment'
import { createTestClub, createTestEvent } from '../utils/testBuilders'

const DB_NAME = 'clubquerydb'

describe('club queries', () => {
    test('clubs correctly', async () => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: true,
        })

        // act
        const result = await apolloTestServer!.client.query({
            query: `{
                clubs { ${clubFragment} }
            }`,
        })

        // assert
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()

        // cleanup
        await apolloTestServer.destroy()
    })
    test('existing club correctly', async () => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: true,
        })

        // act
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

        // assert
        expect(result.data).toBeDefined()
        expect(result).toMatchSnapshot()

        // cleanup
        await apolloTestServer.destroy()
    })
    test('query events for a club', async () => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        const firstClub = await createTestClub()
            .setName('club-1')
            .build(DB_NAME)
        const secondClub = await createTestClub()
            .setName('club-2')
            .build(DB_NAME)
        await createTestEvent()
            .setName('event-club-1')
            .setClubId(firstClub.id)
            .build(DB_NAME)
        await createTestEvent()
            .setName('event-club-2')
            .setClubId(secondClub.id)
            .build(DB_NAME)

        const result = await apolloTestServer.client.query({
            query: `
                query club($id: Int!) {
                    club(id: $id) {
                        events {
                            name
                        }
                    }
                }
            `,
            variables: {
                id: firstClub.id,
            },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data!.club.events.length).toBe(1)
        expect(
            result.data!.club.events.some((e: any) => e.name === 'event-club-1')
        )

        // cleanup
        await apolloTestServer.destroy()
    })
    test('query events for a club from a certain day', async () => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        const firstClub = await createTestClub()
            .setName('club-1')
            .build(DB_NAME)
        const secondClub = await createTestClub()
            .setName('club-2')
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(firstClub.id)
            .setName('event-club-1-1')
            .setDate(
                moment()
                    .subtract(1, 'day')
                    .toISOString()
            )
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(firstClub.id)
            .setName('event-club-1-2')
            .setDate(moment().toISOString())
            .build(DB_NAME)
        await createTestEvent()
            .setClubId(secondClub.id)
            .setName('event-club-2')
            .setDate(moment().toISOString())
            .build(DB_NAME)

        const result = await apolloTestServer.client.query({
            query: `
                query club($id: Int!, $fromDay: String) {
                    club(id: $id) {
                        events(fromDay: $fromDay) {
                            name
                        }
                    }
                }
            `,
            variables: {
                id: firstClub.id,
                fromDay: moment().toISOString(),
            },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data!.club.events.length).toBe(1)
        expect(
            result.data!.club.events.some(
                (e: any) => e.name === 'event-club-1-2'
            )
        )

        // cleanup
        await apolloTestServer.destroy()
    })
})
