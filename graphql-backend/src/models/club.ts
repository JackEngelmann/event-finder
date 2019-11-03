import { Database } from 'sqlite3'
import { Logger } from '../logger'

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

    createClub(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        link?: string
        name: string
        region?: string
        specials?: string
    }) {
        return new Promise<number>((resolve, reject) => {
            this.db.run(
                `
                INSERT INTO club (
                    address,
                    contact,
                    description,
                    email,
                    link,
                    name,
                    region,
                    specials
                ) VALUES (
                    $address,
                    $contact,
                    $description,
                    $email,
                    $link,
                    $name,
                    $region,
                    $specials
                )
                `,
                {
                    $address: input.address,
                    $contact: input.contact,
                    $description: input.description,
                    $email: input.email,
                    $link: input.link,
                    $name: input.name,
                    $region: input.region,
                    $specials: input.specials,
                },
                function(err) {
                    if (err) {
                        console.error(err)
                        return reject(err)
                    }
                    resolve(this.lastID)
                }
            )
        })
    }

    updateClub(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        id: number
        link?: string
        name: string
        region?: string
        specials?: string
    }) {
        return new Promise<number>((resolve, reject) => {
            this.db.run(
                `
                    UPDATE club
                    SET
                        address = $address,
                        contact = $contact,
                        description = $description,
                        email = $email,
                        link = $link,
                        name = $name,
                        region = $region,
                        specials = $specials
                    WHERE id = $id
                `,
                {
                    $address: input.address,
                    $contact: input.contact,
                    $description: input.description,
                    $email: input.email,
                    $id: input.id,
                    $link: input.link,
                    $name: input.name,
                    $region: input.region,
                    $specials: input.specials,
                },
                err => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    resolve()
                }
            )
        })
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

    deleteClub(id: number) {
        return new Promise<void>((resolve, reject) => {
            this.db.run('DELETE FROM club WHERE id = $id', { $id: id }, err => {
                if (err) {
                    const logger = new Logger()
                    logger.error(err)
                    reject(err)
                }
                resolve()
            })
        })
    }
}
