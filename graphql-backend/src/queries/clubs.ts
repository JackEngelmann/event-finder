import { AppContext } from "../appContext"
import { ClubRow } from "../database/rowTypes/club"

export function queryClubs(appContext: AppContext) {
    const { db } = appContext
    const sql = 'SELECT * FROM club'
    return new Promise<ClubRow[]>((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            const clubRows = (rows as ClubRow[])
            if (err) return reject(err)
            return resolve(clubRows)
        })
    })
}
