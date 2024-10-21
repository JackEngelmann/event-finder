import logger from '../../infrastructure/logger'
import { AppContext } from '../../infrastructure/appContext'
import { ImageRepository } from '../orm/image'
import { EventImageRepository } from '../orm/eventImage'
import { ClubImageRepository } from '../orm/clubImage'

export async function resetImageTables(appContext: AppContext) {
    const { db } = appContext
    try {
        await db.getCustomRepository(ClubImageRepository).clear()
        await db.getCustomRepository(EventImageRepository).clear()
        await db.getCustomRepository(ImageRepository).clear()
    } catch (error) {
        logger.error(error)
        throw error
    }
}
