import { AppContext } from '../appContext'
import { Database } from 'sqlite3'
import { requireNumber } from '../validationUtils'

export type UpdateEventInput = {
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
}

export function updateEvent(appContext: AppContext, input: UpdateEventInput) {
    const { db } = appContext
    return new Promise((resolve, reject) => {
        db.serialize(async () => {
            await updateEventRow(db, input)
            await updateGenreAssignments(db, input.id, input.genreIds || [])
            resolve()
        })
    })
}

function updateEventRow(db: Database, input: UpdateEventInput) {
    requireNumber(input.id)
    return new Promise<number>((resolve, reject) => {
        db.run(
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
            },
            function(err) {
                if (err) reject(err)
                resolve(this.lastID)
            }
        )
    })
}

function updateGenreAssignments(
    db: Database,
    eventId: number,
    genreIds: number[] 
) {
    return new Promise((resolve, reject) => {
        const placeholders = genreIds.map(g => '(?, ?)').join(',')
        const values = genreIds.flatMap(genreId => [eventId, genreId])
        db.serialize(() => {
            db.run(
                `DELETE FROM eventGenre WHERE eventId = $eventId`,
                {$eventId: eventId}
            )
            if (genreIds.length === 0) return resolve()
            db.run(
                'insert into eventGenre (eventId, genreId) VALUES ' + placeholders,
                values,
                err => err ? reject(err) : resolve(),
            )
        })
    })
}
