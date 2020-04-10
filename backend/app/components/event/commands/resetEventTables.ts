import { Logger } from "../../../infrastructure/logger";
import { AppContext } from "../../../infrastructure/appContext";
import { EventModel } from "../orm/event";

const logger = new Logger()

export function resetEventTables(appContext: AppContext) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    return new Promise<void>(async (resolve, reject) => {
        try {
            await eventModel.clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}