import { EventImageRepository } from '../orm/eventImage'
import { AppContext } from '../../../infrastructure/appContext'

type SetImageUrlsForEventInput = {
    eventId: number
    imageUrls: string[]
}
export async function setImageUrlsForEvent(
    appContext: AppContext,
    input: SetImageUrlsForEventInput
) {
    const { db } = appContext
    const { eventId, imageUrls } = input
    const eventImageRepository = db.getCustomRepository(EventImageRepository)
    await eventImageRepository.delete({ eventId })
    if (imageUrls.length > 0) {
        await eventImageRepository.insert(
            imageUrls.map(imageUrl => ({ eventId, imageUrl }))
        )
    }
}
