import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { EventRepository } from '../orm/event'

const logger = new Logger()

export async function resetEventTables(appContext: AppContext) {
    const { db } = appContext
    try {
        await db.getCustomRepository(EventRepository).clear()
    } catch (err) {
        logger.error(err)
        throw err
    }
}
