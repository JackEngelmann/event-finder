import { Database } from "sqlite3"

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
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) return reject(err)
                return resolve(rows)
            })
        })
    }
}


export default ClubService