import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { EventRepository } from '../orm/event'

const logger = new Logger()

export function resetEventTables(appContext: AppContext) {
    const { db } = appContext
    return new Promise<void>(async (resolve, reject) => {
        try {
            await db.getCustomRepository(EventRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
