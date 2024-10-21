import { AppContext } from '../../../infrastructure/appContext'
import { UserRepository } from '../orm/user'
import logger from '../../../infrastructure/logger'


export async function resetAuthTables(appContext: AppContext) {
    try {
        await appContext.db.getCustomRepository(UserRepository).clear()
    } catch (err) {
        logger.error(err)
        throw err
    }
}
