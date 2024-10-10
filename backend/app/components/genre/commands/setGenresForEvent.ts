import { AppContext } from '../../../infrastructure/appContext'
import { EventGenreRepository } from '../orm/eventGenre'

type SetGenresForEventInput = {
    eventId: number
    genreIds?: number[]
}

export async function setGenresForEvent(
    appContext: AppContext,
    input: SetGenresForEventInput
) {
    const { db } = appContext
    const { eventId, genreIds = [] } = input

    const eventGenreRepository = db.getCustomRepository(EventGenreRepository)
    await eventGenreRepository.delete({ eventId })

    if (genreIds.length === 0) return

    const eventGenres = genreIds.map(genreId =>
        eventGenreRepository.create({ genreId, eventId })
    )
    await eventGenreRepository.save(eventGenres)
}
