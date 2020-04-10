import { Logger } from "../../../infrastructure/logger";
import { AppContext } from "../../../infrastructure/appContext";
import { ClubModel } from "../orm/club";

const logger = new Logger()

export function resetClubTables(appContext: AppContext) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    return new Promise<void>(async (resolve, reject) => {
        try {
            await clubModel.clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
