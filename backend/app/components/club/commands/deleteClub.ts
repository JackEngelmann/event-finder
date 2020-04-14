import { AppContext } from '../../../infrastructure/appContext'
import { ClubModel } from '../orm/club'
import { Logger } from '../../../infrastructure/logger'
import { EventModel } from '../../event/orm/event'
import { deleteEvent } from '../../event/commands/deleteEvent'
import { deleteLinksForClub } from '../../link/commands/deleteLinksForClub'

export function deleteClub(appContext: AppContext, clubId: number) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    const eventModel = new EventModel(db)
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await clubModel.deleteClub(clubId)
            const connectedEvents = await eventModel.getEventsFromClub(clubId)
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
