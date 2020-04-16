import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { EventGenreRepository } from '../orm/eventGenre'

const logger = new Logger()

export function resetGenreTables(appContext: AppContext) {
    const { db } = appContext
    return new Promise<void>(async (resolve, reject) => {
        try {
            await db.getCustomRepository(EventGenreRepository).clear()
            await db.getCustomRepository(EventGenreRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
