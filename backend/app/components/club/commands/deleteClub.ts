import { AppContext } from '../../../infrastructure/appContext'
import { Logger } from '../../../infrastructure/logger'
import { EventRepository } from '../../event/orm/event'
import { deleteEvent } from '../../event/commands/deleteEvent'
import { deleteLinksForClub } from '../../link/commands/deleteLinksForClub'
import { ClubRepository } from '../orm/club'

export function deleteClub(appContext: AppContext, clubId: number) {
    const { db } = appContext
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
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
            resolve()
        } catch (err) {
            logger.error(err)
            reject(err)
        }
    })
}
