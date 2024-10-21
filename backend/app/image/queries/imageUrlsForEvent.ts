import { AppContext } from '../../infrastructure/appContext'
import { EventImageRepository } from '../orm/eventImage'

export async function queryImageUrlsForEvent(
    appContext: AppContext,
    eventId: number
) {
    const { db } = appContext
    const eventImageRepository = db.getCustomRepository(EventImageRepository)
    const eventImages = await eventImageRepository.find({ eventId })
    return eventImages.map(eventImage => eventImage.imageUrl)
}
