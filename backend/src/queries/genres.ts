import { AppContext } from "../appContext"
import { GenreModel } from "../database/models/genre"

export function queryGenres(appContext: AppContext) {
    const { db } = appContext
    const genreModel = new GenreModel(db);
    return genreModel.getGenres()
}