import { AppContext } from "../appContext";
import { GenreModel } from "../models/genre";

export function queryGenre(appContext: AppContext, id: number) {
    const { db } = appContext
    const genreModel = new GenreModel(db)
    return genreModel.getGenre(id)
}