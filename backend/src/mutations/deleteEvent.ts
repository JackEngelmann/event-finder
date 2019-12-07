import { AppContext } from '../appContext'
import { EventModel } from '../database/entity/event'
import { EventGenreModel } from '../database/entity/eventGenre';
import { Logger } from '../logger';

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db);
    const eventGenreModel = new EventGenreModel(db);
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            console.log({ id })
            await eventModel.deleteEvent(id)
            // await eventGenreModel.deleteAllGenresForEvent(id);
            resolve()
        } catch(err) {
            logger.error(err)
            reject(err)
        }
    })
}
