import { AppContext } from "../appContext"
import { GenreRow } from "../database/rowTypes/genre"

export function queryGenres(appContext: AppContext) {
    const { db } = appContext
    const sql = 'SELECT * FROM genre'
    return new Promise<GenreRow[]>((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            const genreRows = (rows as GenreRow[])
            if (err) return reject(err)
            return resolve(genreRows)
        })
    })
}