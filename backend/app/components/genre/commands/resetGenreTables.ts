import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { EventGenreRepository } from '../orm/eventGenre'

const logger = new Logger()

export async function resetGenreTables(appContext: AppContext) {
    const { db } = appContext
    try {
        await db.getCustomRepository(EventGenreRepository).clear()
        await db.getCustomRepository(EventGenreRepository).clear()
    } catch (error) {
        logger.error(error)
        throw error
    }
}
