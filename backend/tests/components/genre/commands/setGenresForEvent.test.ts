import { createDbConnection } from '../../../../app/infrastructure/database'
import { getConnection } from 'typeorm'
import { createTestEvent } from '../../../utils/testBuilders'
import { setGenresForEvent } from '../../../../app/genre/commands/setGenresForEvent'
import { createTestGenre } from '../../../utils/testBuilders/genreTestBuilder'
import { EventGenreRepository } from '../../../../app/genre/orm/eventGenre'

const CONNECTION_NAME = 'setGenresForEvent-test'

describe('setGenresForEvent', () => {
    test('create', async done => {
        await createDbConnection(CONNECTION_NAME)
        const connection = getConnection(CONNECTION_NAME)
        await connection.synchronize(true)
        const appContext = {
            db: connection,
            isAdmin: true,
        }

        const event = await createTestEvent().build(CONNECTION_NAME)

        const genre1 = await createTestGenre()
            .setName('genre 1')
            .build(CONNECTION_NAME)

        const genre2 = await createTestGenre()
            .setName('genre 2')
            .build(CONNECTION_NAME)

        await setGenresForEvent(appContext, {
            eventId: event.id,
            genreIds: [genre1.id, genre2.id],
        })

        const actualEventGenres = await connection
            .getCustomRepository(EventGenreRepository)
            .find({ eventId: event.id })

        expect(actualEventGenres.length).toBe(2)
        expect(
            actualEventGenres.some(
                a => a.genreId === genre1.id && a.eventId === event.id
            )
        ).toBe(true)
        expect(
            actualEventGenres.some(
                a => a.genreId === genre2.id && a.eventId === event.id
            )
        ).toBe(true)
        done()
    })
    test('delete', async done => {
        await createDbConnection(CONNECTION_NAME)
        const connection = getConnection(CONNECTION_NAME)
        await connection.synchronize(true)
        const appContext = {
            db: connection,
            isAdmin: true,
        }

        const event = await createTestEvent().build(CONNECTION_NAME)

        const genre1 = await createTestGenre()
            .setName('genre 1')
            .build(CONNECTION_NAME)

        const genre2 = await createTestGenre()
            .setName('genre 2')
            .build(CONNECTION_NAME)

        await setGenresForEvent(appContext, {
            eventId: event.id,
            genreIds: [genre1.id, genre2.id],
        })

        await setGenresForEvent(appContext, {
            eventId: event.id,
            genreIds: [],
        })
        const actualEventGenres = await connection
            .getCustomRepository(EventGenreRepository)
            .find({ eventId: event.id })
        expect(actualEventGenres.length).toBe(0)
        done()
    })
})
