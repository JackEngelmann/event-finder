import ClubService from './clubService'
import { Database } from 'sqlite3'

class EventService {
    db: Database
    clubService: ClubService

    constructor(db: any) {
        this.db = db
        this.clubService = new ClubService(db)
    }

    getAllEvents = async () => {
        const sql = 'SELECT * FROM event'
        const params = []
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, async (err, rows) => {
                if (err) return reject(err)
                const result = await Promise.all(rows.map(this.enhanceEvent))
                resolve(result)
            })
        })
    }

    getEvent = async (id: number) => {
        const sql = 'SELECT * FROM event WHERE id = ?'
        const params = [id]
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, async (err, row) => {
                if (err) return reject(err)
                const result = this.enhanceEvent(row)
                resolve(result)
            })
        })
    }

    enhanceEvent = async (eventRow) => {
        const club = await this.clubService.getClub(eventRow.id)
        return { club, ...eventRow }
    }
}

export default EventService
