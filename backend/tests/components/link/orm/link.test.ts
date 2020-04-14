import { createDbConnection } from '../../../../app/infrastructure/database'
import { getConnection, InsertResult } from 'typeorm'
import { LinkRepository } from '../../../../app/components/link/orm/link'
import { EventLinkModel } from '../../../../app/components/link/orm/eventLink'
import { EventDataModel } from '../../../../app/components/event/orm/event'
import { ClubDataModel } from '../../../../app/components/club/orm/club'

const DB_NAME = 'link-tests'

describe('link', () => {
    test('getLinksForEvent should return the links for an event', async done => {
        // arrange
        await createDbConnection(DB_NAME)
        const connection = getConnection(DB_NAME)
        await connection.synchronize(true)
        const eventInsertResult = await connection.manager.insert(
            EventDataModel,
            {
                date: 'date',
                name: 'event 1',
            }
        )
        await connection.manager.insert(ClubDataModel, {
            name: 'club 1',
        })
        const linkInsertResult = await connection
            .getCustomRepository(LinkRepository)
            .insert({
                type: 'test-type',
                href: 'test-href',
            })
        const eventId = eventInsertResult.identifiers[0].id
        const linkId = linkInsertResult.identifiers[0].id
        await connection.getCustomRepository(EventLinkModel).insert({
            eventId,
            linkId,
        })

        // act
        const actualLinks = await connection
            .getCustomRepository(LinkRepository)
            .getLinksForEvent(eventId)

        // assert
        expect(actualLinks.length).toBe(1)
        done()
    })
})
