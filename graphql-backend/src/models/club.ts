import { Database } from 'sqlite3'

export class ClubDataModel {
    id: number
    name: string
    address?: string
    region?: string
    contact?: string
    email?: string
    specials?: string
    description?: string
    link?: string
    constructor(row: any) {
        this.id = row.id
        this.name = row.name
        this.address = row.address
        this.region = row.region
        this.contact = row.contact
        this.email = row.email
        this.specials = row.specials
        this.description = row.description
        this.link = row.link
    }
}

export class ClubModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    getClub(id: number) {
        const sql = 'SELECT * FROM club WHERE id = ?'
        const params = [id]
        return new Promise<ClubDataModel | undefined>((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) return reject(err)
                if (!row) {
                    return resolve(undefined)
                }
                const club = new ClubDataModel(row)
                return resolve(club)
            })
        })
    }

    getClubs() {
        const sql = 'SELECT * FROM club'
        return new Promise<ClubDataModel[]>((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) return reject(err)
                const clubs = rows.map(r => new ClubDataModel(r))
                return resolve(clubs)
            })
        })
    }
}
