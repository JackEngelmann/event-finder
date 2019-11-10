import { AppContext } from '../appContext'
import { EventModel } from '../database/models/event'
import { EventGenreModel } from '../database/models/eventGenre'

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
    const eventModel = new EventModel(db)
    const eventGenreModel = new EventGenreModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.updateEvent(input)
            await eventGenreModel.setGenresForAnEvent(input.id, input.genreIds)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}
