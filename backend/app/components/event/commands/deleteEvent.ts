import { AppContext } from '../../../infrastructure/appContext'
import { Logger } from '../../../infrastructure/logger'
import { deleteLinksForEvent } from '../../link/commands/deleteLinksForEvent'
import { EventRepository } from '../orm/event'

export function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await db.getCustomRepository(EventRepository).delete({ id })
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
