import { AppContext } from '../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'
import logger from '../../infrastructure/logger'

export async function resetClubTables(appContext: AppContext) {
    try {
        await appContext.db.getCustomRepository(ClubRepository).clear()
    } catch (error) {
        logger.error(error)
        throw error
    }
}
