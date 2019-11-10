import { AppContext } from '../appContext'
import { EventModel } from '../database/models/event'
import { EventGenreModel } from '../database/models/eventGenre';
import { Logger } from '../logger';

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db);
    const eventGenreModel = new EventGenreModel(db);
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.deleteEvent(id)
            await eventGenreModel.deleteAllGenresForEvent(id);
            resolve()
        } catch(err) {
            logger.error(err)
            reject(err)
        }
    })
}
