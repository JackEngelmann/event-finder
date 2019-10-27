import { Database } from "sqlite3"

export interface IClubService {
    getClub(id: number): any // TODO
}

class ClubService {
    db: Database

    constructor(db: Database) {
        this.db = db
    }

    async getClub(id: number) {
        const sql = 'SELECT * FROM club WHERE id = ?'
        const params = [id]
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) return reject(err)
                return resolve(row)
            })
        })
    }

    async getAllClubs() {
        const sql = 'SELECT * FROM club'
        const params = []
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) return reject(err)
                return resolve(rows)
            })
        })
    }
}


export default ClubService