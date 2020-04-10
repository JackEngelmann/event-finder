import { AppContext } from '../../../infrastructure/appContext'
import { GenreModel } from '../orm/genre'

export function queryGenre(appContext: AppContext, id: number) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    return genreModel.getGenre(id)
}
