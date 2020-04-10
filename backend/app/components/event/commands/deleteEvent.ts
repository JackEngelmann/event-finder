import { AppContext } from '../../../infrastructure/appContext'
import { EventModel } from '../orm/event'
import { EventGenreModel } from '../../genre/orm/eventGenre'
import { Logger } from '../../../infrastructure/logger'

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    const eventGenreModel = new EventGenreModel(db)
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.deleteEvent(id)
            // TODO: comment in
            // await eventGenreModel.clearGenresForEvent(id);
            resolve()
        } catch (err) {
            logger.error(err)
            reject(err)
        }
    })
}
