import { AppContext } from "../appContext";
import { EventRow } from "../database/rowTypes/event";
import moment from 'moment'

type Filter = {
    date?: string
}

export function queryEvents(appContext: AppContext, filter?: Filter) {
    const { db } = appContext
    const sql = 'SELECT * FROM event'
    return new Promise<EventRow[]>((resolve, reject) => {
        db.all(sql, [], async (err, rows) => {
            if (err) return reject(err)

            let eventRows = (rows as EventRow[])

            if (filter && filter.date) {
                eventRows = eventRows.filter(eventRow => moment(eventRow.date).isSame(moment(filter.date), 'day'))
            }

            resolve(eventRows)
        })
    })
}