import { AppContext } from '../appContext'
import { EventModel } from '../database/entity/event'
import { EventGenreModel } from '../database/entity/eventGenre'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../database/entity/image'
import { ImageService } from '../service/imageService'
import { EventImageModel } from '../database/entity/eventImage'

export type CreateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: String
    genreIds?: number[]
    image?: Promise<FileUpload>
    imageUrls?: string[]
    link?: string
    minimumAge?: number
    name: string
    priceCategory?: number
    special?: string
}

export function createEvent(appContext: AppContext, input: CreateEventInput) {
    const { db } = appContext
    const eventModel = new EventModel(db);
    const eventGenreModel = new EventGenreModel(db);
    const eventImageModel = new EventImageModel(db)
    return new Promise<number>(async (resolve, reject) => {
        try {
            const eventId = await eventModel.createEvent(input)
            await eventGenreModel.setGenresForAnEvent(eventId, input.genreIds)
            await eventImageModel.setImageUrlsForEvent(eventId, input.imageUrls)
            resolve(eventId)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
