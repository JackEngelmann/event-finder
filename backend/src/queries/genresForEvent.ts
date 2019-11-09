import { AppContext } from "../appContext"
import { GenreModel } from "../models/genre"

export function queryGenresForEvent(appContext: AppContext, eventId: number) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    return genreModel.getGenresForEvent(eventId)
}