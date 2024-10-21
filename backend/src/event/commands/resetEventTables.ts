import { AppContext } from '../../infrastructure/appContext'
import logger from '../../infrastructure/logger'
import { EventRepository } from '../orm/event'

export async function resetEventTables(appContext: AppContext) {
    const { db } = appContext
    try {
        await db.getCustomRepository(EventRepository).clear()
    } catch (err) {
        logger.error(err)
        throw err
    }
}
