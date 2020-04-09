import { AppContext } from '../infrastructure/appContext'
import { ClubModel } from '../database/entity/club'
import { Logger } from '../logger'
import { EventModel } from '../database/entity/event'
import { deleteEvent } from './deleteEvent'

export function deleteClub(appContext: AppContext, clubId: number) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    const eventModel = new EventModel(db)
    const logger = new Logger()
    return new Promise(async (resolve, reject) => {
        try {
            await clubModel.deleteClub(clubId)
            const connectedEvents = await eventModel.getEventsFromClub(clubId)
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
