import { AppContext } from '../../../infrastructure/appContext'
import { GenreModel } from '../orm/genre'

export function queryGenresForEvent(appContext: AppContext, eventId: number) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    return genreModel.getGenresForEvent(eventId)
}
