import { AppContext } from '../../infrastructure/appContext'
import { GenreRepository } from '../orm/genre'

export async function queryGenres(appContext: AppContext) {
    const { db } = appContext
    const genreRepository = db.getCustomRepository(GenreRepository)
    return await genreRepository.find()
}
