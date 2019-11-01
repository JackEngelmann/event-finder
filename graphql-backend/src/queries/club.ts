import { AppContext } from "../appContext";
import { ClubRow } from "../database/rowTypes/club";
import { requireNumber } from "../validationUtils";

export function queryClub(appContext: AppContext, id: number) {
    requireNumber(id)
    const { db } = appContext
    const sql = 'SELECT * FROM club WHERE id = ?'
    const params = [id]
    return new Promise<ClubRow>((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) return reject(err)
            const clubRow = (row as ClubRow)
            return resolve(clubRow)
        })
    })
}