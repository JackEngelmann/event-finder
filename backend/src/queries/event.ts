import { AppContext } from "../appContext";
import { EventModel } from "../database/models/event";

export function queryEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    return eventModel.getEvent(id)
}