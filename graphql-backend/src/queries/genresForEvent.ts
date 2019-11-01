import { requireNumber } from "../validationUtils"
import { AppContext } from "../appContext"
import { GenreRow } from "../database/rowTypes/genre"

export function queryGenresForEvent(appContext: AppContext, eventId: number) {
    requireNumber(eventId)
    const { db } = appContext
    const sql = 'SELECT genre.* from genre INNER JOIN eventGenre ON eventGenre.genreId = genre.id WHERE eventId = ?'
    const params = [eventId]
    return new Promise<GenreRow[]>((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err)
            const genreRows = (rows as GenreRow[])
            return resolve(genreRows)
        })
    })
}