import { createDbConnection } from '../../../../src/infrastructure/database'
import { getConnection } from 'typeorm'
import { EventTestBuilder } from '../../../utils/testBuilders'
import { setLinksForEvent } from '../../../../src/link/commands/setLinksForEvent'
import { queryLinksForEvent } from '../../../../src/link/queries/linksForEvent'

const CONNECTION_NAME = 'setLinksForEvent-test'

describe('setLinksForEvent', () => {
    test('create links', async () => {
        await createDbConnection(CONNECTION_NAME)
        const connection = getConnection(CONNECTION_NAME)
        await connection.synchronize(true)
        const appContext = {
            db: connection,
            isAdmin: true,
        }

        const event = await new EventTestBuilder().build(CONNECTION_NAME)

        await setLinksForEvent(appContext, {
            eventId: event.id,
            links: [{ href: 'test', type: 'FACEBOOK' }],
        })

        const actualLinks = await queryLinksForEvent(appContext, event.id)
        expect(actualLinks.length).toBe(1)
        expect(actualLinks[0].href).toBe('test')
    })
    test('set links', async () => {
        await createDbConnection(CONNECTION_NAME)
        const connection = getConnection(CONNECTION_NAME)
        await connection.synchronize(true)
        const appContext = {
            db: connection,
            isAdmin: true,
        }

        const event = await new EventTestBuilder().build(CONNECTION_NAME)

        await setLinksForEvent(appContext, {
            eventId: event.id,
            links: [{ href: 'test', type: 'FACEBOOK' }],
        })

        const actualLinks = await queryLinksForEvent(appContext, event.id)
        expect(actualLinks.length).toBe(1)
        expect(actualLinks[0].href).toBe('test')

        await setLinksForEvent(appContext, {
            eventId: event.id,
            links: [{ href: 'test2', type: 'HOMEPAGE' }],
        })

        const actualLinks2 = await queryLinksForEvent(appContext, event.id)
        expect(actualLinks2.length).toBe(1)
        expect(actualLinks2[0].href).toBe('test2')
        expect(actualLinks2[0].type).toBe('HOMEPAGE')
    })
})
