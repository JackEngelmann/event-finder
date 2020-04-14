import { AppContext } from '../../../infrastructure/appContext'
import { EventModel } from '../orm/event'
import { Logger } from '../../../infrastructure/logger'
import { deleteLinksForEvent } from '../../link/commands/deleteLinksForEvent'

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.deleteEvent(id)
            // TODO: comment in
            // await eventGenreModel.clearGenresForEvent(id);
            await deleteLinksForEvent(appContext, id)
            resolve()
        } catch (err) {
            logger.error(err)
            reject(err)
        }
    })
}
