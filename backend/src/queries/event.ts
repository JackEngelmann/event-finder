import { AppContext } from '../infrastructure/appContext'
import { EventModel } from '../database/entity/event'

export function queryEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    return eventModel.getEvent(id)
}
