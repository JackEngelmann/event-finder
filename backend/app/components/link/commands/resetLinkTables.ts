import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'
import { EventLinkRepository } from '../orm/eventLink'
import { ClubLinkRepository } from '../orm/clubLink'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export function resetLinkTables(appContext: AppContext) {
    const { db } = appContext
    return new Promise<void>(async (resolve, reject) => {
        try {
            await db.getCustomRepository(LinkRepository).clear()
            await db.getCustomRepository(EventLinkRepository).clear()
            await db.getCustomRepository(ClubLinkRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
