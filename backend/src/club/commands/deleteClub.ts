import { AppContext } from '../../infrastructure/appContext'
import logger from '../../infrastructure/logger'
import { EventRepository } from '../../event/orm/event'
import { deleteEvent } from '../../event/commands/deleteEvent'
import { deleteLinksForClub } from '../../link/commands/deleteLinksForClub'
import { ClubRepository } from '../orm/club'

export async function deleteClub(appContext: AppContext, clubId: number) {
    const { db } = appContext
    try {
        await db.getCustomRepository(ClubRepository).delete(clubId)
        // TODO: refactor
        const connectedEvents = await appContext.db
            .getCustomRepository(EventRepository)
            .findEventsForClub(clubId)
        await deleteLinksForClub(appContext, clubId)
        const deleteConnectedEventsPromises = connectedEvents.map(event =>
            deleteEvent(appContext, event.id)
        )
        await Promise.all(deleteConnectedEventsPromises)
    } catch (error) {
        logger.error(error)
        throw error
    }
}
