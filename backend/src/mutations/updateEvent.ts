import { AppContext } from '../appContext'
import { EventModel } from '../database/entity/event'
import { EventGenreModel } from '../database/entity/eventGenre'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../database/entity/image'
import { ImageService } from '../service/imageService'
import { EventImageModel } from '../database/entity/eventImage'

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
            await eventImageModel.setImageUrlsForEvent(input.id, input.imageUrls)
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
