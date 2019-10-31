import { Database } from 'sqlite3'

class EventService {
    db: Database

    constructor(db: Database) {
        this.db = db
    }

    getAllEvents = async () => {
        const sql = 'SELECT * FROM event'
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], async (err, rows) => {
                if (err) return reject(err)
                resolve(rows)
            })
        })
    }

    getEvent = async (id: number) => {
        const sql = 'SELECT * FROM event WHERE id = ?'
        const params = [id]
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, async (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    }
}

export default EventService
