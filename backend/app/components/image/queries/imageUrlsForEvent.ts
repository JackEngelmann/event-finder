import { AppContext } from '../../../infrastructure/appContext'
import { EventImageModel } from '../orm/eventImage'

export async function queryImageUrlsForEvent(
    appContext: AppContext,
    eventId: number
) {
    const { db } = appContext
    const eventImageModel = new EventImageModel(db)
    return await eventImageModel.getImageUrlsForEvent(eventId)
}
