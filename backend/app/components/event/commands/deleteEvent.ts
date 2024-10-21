import { AppContext } from '../../../infrastructure/appContext'
import logger from '../../../infrastructure/logger'
import { deleteLinksForEvent } from '../../link/commands/deleteLinksForEvent'
import { EventRepository } from '../orm/event'

export async function deleteEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    try {
        await db.getCustomRepository(EventRepository).delete({ id })
        // TODO: comment in
        // await eventGenreModel.clearGenresForEvent(id);
        await deleteLinksForEvent(appContext, id)
    } catch (error) {
        logger.error(error)
        throw error
    }
}
