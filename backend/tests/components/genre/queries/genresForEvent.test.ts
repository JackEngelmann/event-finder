import { createDbConnection } from '../../../../src/infrastructure/database'
import { getConnection } from 'typeorm'
import { createTestEvent } from '../../../utils/testBuilders'
import { setGenresForEvent } from '../../../../src/genre/commands/setGenresForEvent'
import { createTestGenre } from '../../../utils/testBuilders/genreTestBuilder'
import { EventGenreRepository } from '../../../../src/genre/orm/eventGenre'
import { queryGenresForEvent } from '../../../../src/genre/queries/genresForEvent'

const CONNECTION_NAME = 'getGenresForEvent-test'

describe('getGenresForEvent', () => {
    test('', async () => {
        await createDbConnection(CONNECTION_NAME)
        const connection = getConnection(CONNECTION_NAME)
        await connection.synchronize(true)
        const appContext = {
            db: connection,
            isAdmin: true,
        }

        const event1 = await createTestEvent().build(CONNECTION_NAME)

        const event2 = await createTestEvent().build(CONNECTION_NAME)

        const genre1 = await createTestGenre()
            .setName('genre 1')
            .build(CONNECTION_NAME)

        const genre2 = await createTestGenre()
            .setName('genre 2')
            .build(CONNECTION_NAME)

        const genre3 = await createTestGenre()
            .setName('genre 2')
            .build(CONNECTION_NAME)

        await setGenresForEvent(appContext, {
            eventId: event1.id,
            genreIds: [genre1.id, genre2.id],
        })

        await setGenresForEvent(appContext, {
            eventId: event1.id,
            genreIds: [genre1.id, genre2.id],
        })

        await setGenresForEvent(appContext, {
            eventId: event2.id,
            genreIds: [genre2.id, genre3.id],
        })

        const actualEventGenres = await connection
            .getCustomRepository(EventGenreRepository)
            .find({ eventId: event2.id })
        expect(actualEventGenres).toHaveLength(2)

        const actualGenres = await queryGenresForEvent(appContext, event2.id)
        expect(actualGenres).toHaveLength(2)
        expect(actualGenres.some(g => g.id === genre2.id)).toBe(true)
        expect(actualGenres.some(g => g.id === genre3.id)).toBe(true)
    })
})
