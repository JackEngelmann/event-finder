import { AppContext } from '../../../infrastructure/appContext'
import { UserRepository } from '../orm/user'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export async function resetAuthTables(appContext: AppContext) {
    try {
        await appContext.db.getCustomRepository(UserRepository).clear()
    } catch (err) {
        logger.error(err)
        throw err
    }
}
