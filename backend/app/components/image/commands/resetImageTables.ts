import { Logger } from "../../../infrastructure/logger";
import { AppContext } from "../../../infrastructure/appContext";
import { ImageModel } from "../orm/image";
import { EventImageModel } from "../orm/eventImage";
import { ClubImageModel } from "../orm/clubImage";

const logger = new Logger()

export function resetImageTables(appContext: AppContext) {
    const { db } = appContext
    const clubImageModel = new ClubImageModel(db)
    const eventImageModel = new EventImageModel(db)
    const imageModel = new ImageModel(db)
    return new Promise<void>(async (resolve, reject) => {
        try {
            await clubImageModel.clear()
            await eventImageModel.clear()
            await imageModel.clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}