import { Database } from '../database/database'

export class EventDataModel {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: string
    date: string
    description?: string
    id: number
    imageUrl?: string
    minimumAge?: number
    name: string
    priceCategory?: 1 | 2 | 3
    special?: string
    constructor(row: any) {
        this.admissionFee = row.admissionfee
        this.admissionFeeWithDiscount = row.admissionfeewithdiscount
        this.amountOfFloors = row.amountoffloors
        this.clubId = row.clubid
        this.date = row.date
        this.description = row.description
        this.id = row.id
        this.imageUrl = row.imageurl
        this.minimumAge = row.minimumage
        this.name = row.name
        this.priceCategory = row.pricecategory
        this.special = row.special
    }
}

export class EventModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async createEvent(input: {
        name: string
        description?: String
        date: string
        clubId: number
        genreIds?: number[]
        special?: string
        priceCategory?: number
        admissionFee?: number
        admissionFeeWithDiscount?: number
        minimumAge?: number
        amountOfFloors?: number
    }) {
        return this.db
            .get(
                `
                INSERT INTO event (
                    name,
                    date,
                    description,
                    clubId,
                    special,
                    priceCategory,
                    admissionFee,
                    admissionFeeWithDiscount,
                    minimumAge,
                    amountOfFloors
                ) VALUES (
                    $name,
                    $date,
                    $description,
                    $clubId,
                    $special,
                    $priceCategory,
                    $admissionFee,
                    $admissionFeeWithDiscount,
                    $minimumAge,
                    $amountOfFloors
                ) RETURNING Id
            `,
                {
                    $name: input.name,
                    $date: input.date,
                    $description: input.description,
                    $clubId: input.clubId,
                    $special: input.special,
                    $priceCategory: input.priceCategory,
                    $admissionFee: input.admissionFee,
                    $admissionFeeWithDiscount: input.admissionFeeWithDiscount,
                    $minimumAge: input.minimumAge,
                    $amountOfFloors: input.amountOfFloors,
                }
            )
            .then(res => res.id)
    }

    deleteEvent(id: number) {
        return this.db.run('DELETE FROM event WHERE id = $1', [id])
    }

    async getEvent(id: number) {
        const sql = 'SELECT * FROM event WHERE id = $1'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        const event = new EventDataModel(row)
        return event
    }

    async getEvents() {
        const sql = 'SELECT * FROM event'
        const rows = await this.db.all(sql, [])
        return rows.map(r => new EventDataModel(r))
    }

    async getEventsFromClub(clubId: number) {
        const sql = 'SELECT * FROM event WHERE clubId = $1'
        const rows = await this.db.all(sql, [clubId])
        return rows.map(r => new EventDataModel(r))
    }

    updateEvent(input: {
        id: number
        name: string
        description?: String
        date: string
        clubId: number
        genreIds?: number[]
        special?: string
        priceCategory?: number
        admissionFee?: number
        admissionFeeWithDiscount?: number
        minimumAge?: number
        amountOfFloors?: number
    }) {
        return this.db.run(
            `
                UPDATE event 
                SET
                    admissionFee = $1,
                    admissionFeeWithDiscount = $2,
                    amountOfFloors = $3,
                    clubId = $4,
                    date = $5,
                    description = $6,
                    minimumAge = $7,
                    name = $8,
                    priceCategory = $9,
                    special = $10
                WHERE id = $11
            `,
            [
                input.admissionFee,
                input.admissionFeeWithDiscount,
                input.amountOfFloors,
                input.clubId,
                input.date,
                input.description,
                input.minimumAge,
                input.name,
                input.priceCategory,
                input.special,
                input.id,
            ]
        )
    }
}
