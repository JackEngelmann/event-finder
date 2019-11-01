import { AppContext } from "../appContext";
import { EventRow } from "../database/rowTypes/event";
import { requireNumber } from "../validationUtils";

export function queryEvent(appContext: AppContext, id: number) {
    requireNumber(id)
    const { db } = appContext
    const sql = 'SELECT * FROM event WHERE id = ?'
    const params = [id]
    return new Promise<EventRow>((resolve, reject) => {
        db.get(sql, params, async (err, row) => {
            if (err) return reject(err)
            resolve(row)
        })
    })
}