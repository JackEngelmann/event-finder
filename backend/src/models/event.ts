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
        this.admissionFee = row.admissionFee
        this.admissionFeeWithDiscount = row.admissionFeeWithDiscount
        this.amountOfFloors = row.amountOfFloors
        this.clubId = row.clubId
        this.date = row.date
        this.description = row.description
        this.id = row.id
        this.imageUrl = row.imageUrl
        this.minimumAge = row.minimumAge
        this.name = row.name
        this.priceCategory = row.priceCategory
        this.special = row.special
    }
}

export class EventModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    createEvent(input: {
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
                )
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
    }

    deleteEvent(id: number) {
        return this.db.run('DELETE FROM event WHERE id = $id', { $id: id })
    }

    async getEvent(id: number) {
        const sql = 'SELECT * FROM event WHERE id = ?'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        return new EventDataModel(row)
    }

    async getEvents() {
        const sql = 'SELECT * FROM event'
        const rows = await this.db.all(sql, [])
        return rows.map(r => new EventDataModel(r))
    }

    async getEventsFromClub(clubId: number) {
        const sql = 'SELECT * FROM event WHERE clubId = $clubId'
        const rows = await this.db.all(sql, { $clubId: clubId })
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
                    admissionFee = $admissionFee,
                    admissionFeeWithDiscount = $admissionFeeWithDiscount,
                    amountOfFloors = $amountOfFloors,
                    clubId = $clubId,
                    date = $date,
                    description = $description,
                    minimumAge = $minimumAge,
                    name = $name,
                    priceCategory = $priceCategory,
                    special = $special
                WHERE id = $id
            `,
            {
                $admissionFee: input.admissionFee,
                $admissionFeeWithDiscount: input.admissionFeeWithDiscount,
                $amountOfFloors: input.amountOfFloors,
                $clubId: input.clubId,
                $date: input.date,
                $description: input.description,
                $id: input.id,
                $minimumAge: input.minimumAge,
                $name: input.name,
                $priceCategory: input.priceCategory,
                $special: input.special,
            }
        )
    }
}
