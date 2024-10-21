import { AppContext } from '../../infrastructure/appContext'
import { GenreRepository } from '../orm/genre'

export async function queryGenresForEvent(
    appContext: AppContext,
    eventId: number
) {
    const { db } = appContext
    const genreRepository = db.getCustomRepository(GenreRepository)
    return await genreRepository.getGenresForEvent(eventId)
}
