import { AppContext } from '../../../infrastructure/appContext'
import { EventModel } from '../orm/event'
import { EventGenreModel } from '../../genre/orm/eventGenre'
import { EventImageModel } from '../../image/orm/eventImage'

export type UpdateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: string
    genreIds?: number[]
    id: number
    imageUrls?: string[]
    link?: string
    minimumAge?: number
    name: string
    priceCategory?: number
    special?: string
}

export function updateEvent(appContext: AppContext, input: UpdateEventInput) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    const eventGenreModel = new EventGenreModel(db)
    const eventImageModel = new EventImageModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.updateEvent(input)
            await eventGenreModel.setGenresForAnEvent(input.id, input.genreIds)
            await eventImageModel.setImageUrlsForEvent(
                input.id,
                input.imageUrls
            )
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
