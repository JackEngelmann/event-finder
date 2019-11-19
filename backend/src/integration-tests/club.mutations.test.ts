import { ApolloServer } from 'apollo-server-express'
import { createTestDb, Database, destroyTestDb } from '../database/database'
import { insertTestData, clubFragment } from './utils'
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing'
import { typeDefs } from '../graphql/schema'
import { resolvers } from '../graphql/resolvers'
import { createEvent } from '../mutations/createEvent'
import { queryEvent } from '../queries/event'
import { AppContext } from '../appContext'
import { CreateClubInput, createClub } from '../mutations/createClub'
import { UpdateClubInput } from '../mutations/updateClub'
import { queryClub } from '../queries/club'

const DB_NAME = 'clubmutationdb'

const createClubMutation = `
    mutation CreateClub($input: CreateClubInput!) {
        createClub(input: $input) {
            club { ${clubFragment} }
        }
    }
`
const updateClubMutation = `
    mutation UpdateClub($input: UpdateClubInput!) {
        updateClub(input: $input) {
            club { ${clubFragment} }
        }
    }
`
const deleteClubMutation = `
    mutation DeleteClub($id: Int!) {
        deleteClub(id: $id) {
            id
        }
    }
`

describe('club mutations: ', () => {
    let server: ApolloServerTestClient | undefined = undefined
    let db: Database | undefined = undefined
    let appContext: AppContext = { db: db! }

    beforeEach(async done => {
        const newDb = await createTestDb(DB_NAME)
        db = newDb
        appContext = { db: newDb }
        await insertTestData(newDb)
        const newServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: { db: newDb },
        })
        server = createTestClient(newServer)
        done()
    })

    afterEach(async done => {
        await destroyTestDb(DB_NAME)
        done()
    })

    describe('create', () => {
        test('create club with only required information', async done => {
            const input: CreateClubInput = {
                name: 'test',
            }

            const result = await server!.mutate({
                mutation: createClubMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create club with all information', async done => {
            const input: CreateClubInput = {
                address: 'address',
                contact: 'contact',
                description: 'description',
                email: 'email',
                link: 'link',
                name: 'test',
                region: 'region',
                specials: 'speicals',
            }

            const result = await server!.mutate({
                mutation: createClubMutation,
                variables: { input },
            })
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('update', () => {
        test('update club with only required information', async done => {
            const input: UpdateClubInput = {
                name: 'updated-name',
                id: 1,
            }

            const result = await server!.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('update club with all information', async done => {
            const input: UpdateClubInput = {
                address: 'updated-address',
                contact: 'updated-contact',
                description: 'updated-description',
                email: 'updated-email',
                id: 1,
                link: 'updated-link',
                name: 'updated-test',
                region: 'updated-region',
                specials: 'updated-speicals',
            }

            const result = await server!.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })
    })

    describe('delete', () => {
        test('delete club', async done => {
            // arrange
            const clubId = await createClub(appContext, {
                name: 'test',
            })
            const club = await queryClub(appContext, clubId)
            expect(club).toBeDefined()

            // act
            const result = await server!.mutate({
                mutation: deleteClubMutation,
                variables: { id: clubId },
            })

            // assert
            expect(result.errors).toBeUndefined()
            const deletedClub = await queryClub(appContext, clubId)
            expect(deletedClub).toBeUndefined()
            done()
        })

        test('when deleting an event, the events the club did should be deleted too', async done => {
            // arrange
            const clubId = await createClub(appContext, {
                name: 'test',
            })
            const club = await queryClub(appContext, clubId)
            expect(club).toBeDefined()
            const connectedEventId = await createEvent(appContext, {
                clubId,
                name: 'connected event',
                date: 'some date',
            })
            const connectedEvent = await queryEvent(
                appContext,
                connectedEventId
            )
            expect(connectedEvent).toBeDefined()

            // act
            const result = await server!.mutate({
                mutation: deleteClubMutation,
                variables: { id: clubId },
            })

            // assert
            expect(result.errors).toBeUndefined()
            const deletedClub = await queryClub(appContext, clubId)
            expect(deletedClub).toBeUndefined()
            const deletedEvent = await queryEvent(appContext, connectedEventId)
            expect(deletedEvent).toBeUndefined()
            done()
        })
    })
})
