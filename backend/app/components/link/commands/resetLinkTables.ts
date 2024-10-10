import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'
import { EventLinkRepository } from '../orm/eventLink'
import { ClubLinkRepository } from '../orm/clubLink'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export async function resetLinkTables(appContext: AppContext) {
    const { db } = appContext
    try {
        await db.getCustomRepository(LinkRepository).clear()
        await db.getCustomRepository(EventLinkRepository).clear()
        await db.getCustomRepository(ClubLinkRepository).clear()
    } catch (error) {
        logger.error(error)
        throw error
    }
}
