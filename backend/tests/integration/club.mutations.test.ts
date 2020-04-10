import {
    clubFragment,
    createApolloTestServer,
    ApolloTestServer,
    ApolloHttpTestServer,
    insertTestData,
} from './utils'
import { createEvent } from '../../app/components/event/commands/createEvent'
import { queryEvent } from '../../app/components/event/queries/event'
import {
    CreateClubInput,
    createClub,
} from '../../app/components/club/commands/createClub'
import { UpdateClubInput } from '../../app/components/club/commands/updateClub'
import { queryClub } from '../../app/components/club/queries/club'

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
let apolloTestServer: ApolloTestServer | undefined
let apolloHttpTestServer: ApolloHttpTestServer | undefined

afterEach(async done => {
    if (apolloHttpTestServer) await apolloHttpTestServer.destroy()
    if (apolloTestServer) await apolloTestServer.destroy()
    apolloTestServer = undefined
    apolloHttpTestServer = undefined
    done()
})

describe('club mutations: ', () => {
    describe('create', () => {
        test('create club with only required information', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const input: CreateClubInput = {
                name: 'test',
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createClubMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create club with all information', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
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

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createClubMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('create club without being admin should result in error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: false,
                insertTestData: true,
            })
            const input: CreateClubInput = {
                name: 'test',
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: createClubMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeNull()
            expect(result.errors).toBeDefined()
            expect(result.errors).toMatchSnapshot()
            done()
        })
    })

    describe('update', () => {
        test('update club with only required information', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const input: UpdateClubInput = {
                name: 'updated-name',
                id: 1,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })

            // assert
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('update club with all information', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                insertTestData: true,
                dbName: DB_NAME,
            })
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

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })

            // assert
            expect(result.errors).toBeUndefined()
            expect(result.data).toBeDefined()
            expect(result).toMatchSnapshot()
            done()
        })

        test('update club without being admin should result in error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                dbName: DB_NAME,
                isAdmin: false,
                insertTestData: true,
            })
            const input: UpdateClubInput = {
                name: 'test',
                id: 1,
            }

            // act
            const result = await apolloTestServer.client.mutate({
                mutation: updateClubMutation,
                variables: { input },
            })

            // assert
            expect(result.data).toBeNull()
            expect(result.errors).toBeDefined()
            expect(result.errors).toMatchSnapshot()
            done()
        })
    })

    describe('delete', () => {
        test('delete club', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const { client, appContext } = apolloTestServer
            const clubId = await createClub(appContext, {
                name: 'test',
            })
            const club = await queryClub(appContext, clubId)
            expect(club).toBeDefined()

            // act
            const result = await client.mutate({
                mutation: deleteClubMutation,
                variables: { id: clubId },
            })

            // assert
            expect(result.errors).toBeUndefined()
            const deletedClub = await queryClub(appContext, clubId)
            expect(deletedClub).toBeUndefined()
            done()
        })

        test('delete club without permission should yield error', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: false,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const { client } = apolloTestServer

            // act
            const result = await client.mutate({
                mutation: deleteClubMutation,
                variables: { id: 1 },
            })

            // assert
            expect(result.errors).toBeDefined()
            expect(result.data).toBeNull()
            done()
        })

        test('when deleting an event, the events the club did should be deleted too', async done => {
            // arrange
            apolloTestServer = await createApolloTestServer({
                isAdmin: true,
                dbName: DB_NAME,
                insertTestData: true,
            })
            const { client, appContext } = apolloTestServer
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
            const result = await client.mutate({
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
