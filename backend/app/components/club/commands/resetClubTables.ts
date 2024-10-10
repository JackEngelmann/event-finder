import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'

const logger = new Logger()

export async function resetClubTables(appContext: AppContext) {
    try {
        await appContext.db.getCustomRepository(ClubRepository).clear()
    } catch (error) {
        logger.error(error)
        throw error
    }
}
