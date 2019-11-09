import { Logger } from '../logger'
import { Database } from '../database/database'

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

    async createClub(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        link?: string
        name: string
        region?: string
        specials?: string
    }) {
        return this.db
            .get(
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
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7,
                    $8
                ) RETURNING Id
            `,
                [
                    input.address,
                    input.contact,
                    input.description,
                    input.email,
                    input.link,
                    input.name,
                    input.region,
                    input.specials,
                ]
            )
            .then(res => res.id)
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
        return this.db.run(
            `
                UPDATE club
                SET
                    address = $1,
                    contact = $2,
                    description = $3,
                    email = $4,
                    link = $5,
                    name = $6,
                    region = $7,
                    specials = $8
                WHERE id = $9
            `,
            [
                input.address,
                input.contact,
                input.description,
                input.email,
                input.link,
                input.name,
                input.region,
                input.specials,
                input.id
            ]
        )
    }

    async getClub(id: number) {
        const sql = 'SELECT * FROM club WHERE id = $1'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        return new ClubDataModel(row)
    }

    async getClubs() {
        const sql = 'SELECT * FROM club'
        const rows = await this.db.all(sql, [])
        const clubs = rows.map(r => new ClubDataModel(r))
        return clubs
    }

    deleteClub(id: number) {
        return this.db.run('DELETE FROM club WHERE id = $1', [id])
    }
}
