import { AppContext } from '../../../infrastructure/appContext'
import { GenreRepository } from '../orm/genre'

export async function queryGenre(appContext: AppContext, id: number) {
    const { db } = appContext
    return await db.getCustomRepository(GenreRepository).findOne(id)
}
