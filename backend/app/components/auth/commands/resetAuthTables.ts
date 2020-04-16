import { AppContext } from '../../../infrastructure/appContext'
import { UserRepository } from '../orm/user'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export function resetAuthTables(appContext: AppContext) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            appContext.db.getCustomRepository(UserRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
