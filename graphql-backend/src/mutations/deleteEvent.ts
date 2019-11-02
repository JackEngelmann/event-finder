import { AppContext } from '../appContext'
import { EventModel } from '../models/event'
import { EventGenreModel } from '../models/eventGenre';

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db);
    const eventGenreModel = new EventGenreModel(db);
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.deleteEvent(id)
            await eventGenreModel.deleteAllGenresForEvent(id);
            resolve()
        } catch(err) {
            reject(err)
        }
    })
}
