import { Logger } from '../../../infrastructure/logger'
import { AppContext } from '../../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'

const logger = new Logger()

export function resetClubTables(appContext: AppContext) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await appContext.db.getCustomRepository(ClubRepository).clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
