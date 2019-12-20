import { AppContext } from "../appContext";
import { EventImageModel } from "../database/entity/eventImage";

export async function queryImageUrlsForEvent(appContext: AppContext, eventId: number) {
    const { db } = appContext
    const eventImageModel = new EventImageModel(db)
    return await eventImageModel.getImageUrlsForEvent(eventId)
}