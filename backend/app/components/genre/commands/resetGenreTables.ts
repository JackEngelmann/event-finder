import { Logger } from "../../../infrastructure/logger";
import { AppContext } from "../../../infrastructure/appContext";
import { GenreModel } from "../orm/genre";
import { EventGenreModel } from "../orm/eventGenre";

const logger = new Logger()

export function resetGenreTables(appContext: AppContext) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    const eventGenreModel = new EventGenreModel(db)
    return new Promise<void>(async (resolve, reject) => {
        try {
            await genreModel.clear()
            await eventGenreModel.clear()
            resolve()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}