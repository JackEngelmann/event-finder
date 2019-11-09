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
        return this.db.run(
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
            }
        )
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
            }
        )
    }

    async getClub(id: number) {
        const sql = 'SELECT * FROM club WHERE id = ?'
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
        return this.db.run('DELETE FROM club WHERE id = $id', { $id: id })
    }
}
