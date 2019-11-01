import { AppContext } from '../appContext'
import { Database } from 'sqlite3'

export type CreateEventInput = {
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
}

// TODO: use $ for db params

export function createEvent(appContext: AppContext, input: CreateEventInput) {
    const { db } = appContext
    return new Promise<number>((resolve, reject) => {
        db.serialize(async () => {
            const eventId = await insertEventRow(db, input)
            await assignGenres(db, eventId, input.genreIds)
            resolve(eventId)
        })
    })
}

function insertEventRow(db: Database, input: CreateEventInput) {
    return new Promise<number>((resolve, reject) => {
        db.run(
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
            },
            function(err) {
                if (err) reject(err)
                resolve(this.lastID)
            }
        )
    })
}

function assignGenres(
    db: Database,
    eventId: number,
    genreIds: number[] | undefined
) {
    return new Promise((resolve, reject) => {
        if (genreIds === undefined) return resolve()
        const placeholders = genreIds.map(g => '(?, ?)').join(',')
        const values = genreIds.flatMap(genreId => [eventId, genreId])
        db.run(
            'insert into eventGenre (eventId, genreId) VALUES ' + placeholders,
            values,
            err => err ? reject(err) : resolve(),
        )
    })
}
