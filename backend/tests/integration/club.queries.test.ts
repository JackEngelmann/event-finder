import {
    clubFragment,
    ApolloTestServer,
    createApolloTestServer,
} from '../utils'
import { ClubModel } from '../../app/components/club/orm/club'
import { EventModel } from '../../app/components/event/orm/event'
import moment = require('moment')

const DB_NAME = 'clubquerydb'

describe('club queries', () => {
    test('clubs correctly', async done => {
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
        done()
    })
    test('existing club correctly', async done => {
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
        done()
    })
    test('query events for a club', async done => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        const clubModel = new ClubModel(apolloTestServer.appContext.db)
        const firstClubId = await clubModel.createClub({
            name: 'club-1',
        })
        const secondClubId = await clubModel.createClub({
            name: 'club-2',
        })
        const eventModel = new EventModel(apolloTestServer.appContext.db)
        await eventModel.createEvent({
            clubId: firstClubId,
            name: 'event-club-1',
            date: moment().toISOString(),
        })
        await eventModel.createEvent({
            clubId: secondClubId,
            name: 'event-club-2',
            date: moment().toISOString(),
        })

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
                id: firstClubId,
            },
        })
        expect(result.errors).toBeUndefined()
        expect(result.data!.club.events.length).toBe(1)
        expect(
            result.data!.club.events.some((e: any) => e.name === 'event-club-1')
        )

        // cleanup
        await apolloTestServer.destroy()
        done()
    })
    test('query events for a club from a certain day', async done => {
        // arrange
        const apolloTestServer = await createApolloTestServer({
            isAdmin: false,
            dbName: DB_NAME,
            insertTestData: false,
        })
        const clubModel = new ClubModel(apolloTestServer.appContext.db)
        const firstClubId = await clubModel.createClub({
            name: 'club-1',
        })
        const secondClubId = await clubModel.createClub({
            name: 'club-2',
        })
        const eventModel = new EventModel(apolloTestServer.appContext.db)
        await eventModel.createEvent({
            clubId: firstClubId,
            name: 'event-club-1-1',
            date: moment()
                .subtract(1, 'day')
                .toISOString(),
        })
        await eventModel.createEvent({
            clubId: firstClubId,
            name: 'event-club-1-2',
            date: moment().toISOString(),
        })
        await eventModel.createEvent({
            clubId: secondClubId,
            name: 'event-club-2',
            date: moment().toISOString(),
        })

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
                id: firstClubId,
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
        done()
    })
})
