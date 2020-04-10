import { AppContext } from '../../../infrastructure/appContext'
import { UserModel } from '../orm/user'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export function resetAuthTables(appContext: AppContext) {
    const { db } = appContext
    const userModel = new UserModel(db)
    return new Promise<void>(async (resolve, reject) => {
        try {
            await userModel.clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
