import { AppContext } from '../appContext'
import { EventModel } from '../database/models/event'
import { EventGenreModel } from '../database/models/eventGenre'

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

export function createEvent(appContext: AppContext, input: CreateEventInput) {
    const { db } = appContext
    const eventModel = new EventModel(db);
    const eventGenreModel = new EventGenreModel(db);
    return new Promise<number>(async (resolve, reject) => {
        try {
            const eventId = await eventModel.createEvent(input)
            await eventGenreModel.setGenresForAnEvent(eventId, input.genreIds)
            resolve(eventId)
        } catch (err) {
            reject(err)
        }
    })
}
