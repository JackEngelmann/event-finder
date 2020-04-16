import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { ImageRepository } from '../orm/image'
import { EventImageRepository } from '../orm/eventImage'
import { ClubImageRepository } from '../orm/clubImage'

const logger = new Logger()

export function resetImageTables(appContext: AppContext) {
    const { db } = appContext
    return new Promise<void>(async (resolve, reject) => {
        try {
            await db.getCustomRepository(ClubImageRepository).clear()
            await db.getCustomRepository(EventImageRepository).clear()
            await db.getCustomRepository(ImageRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
