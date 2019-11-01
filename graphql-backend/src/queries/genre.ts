import { AppContext } from "../appContext";
import { GenreRow } from "../database/rowTypes/genre";

export function queryGenre(appContext: AppContext, id: number) {
    const { db } = appContext
    const sql = 'SELECT * FROM genre WHERE id = ?'
    const params = [id]
    return new Promise<GenreRow>((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) return reject(err)
            const clubRow = (row as GenreRow)
            return resolve(clubRow)
        })
    })
}