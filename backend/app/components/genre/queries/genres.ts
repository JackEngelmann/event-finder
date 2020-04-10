import { AppContext } from '../../../infrastructure/appContext'
import { GenreModel } from '../orm/genre'

export function queryGenres(appContext: AppContext) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    return genreModel.getGenres()
}
