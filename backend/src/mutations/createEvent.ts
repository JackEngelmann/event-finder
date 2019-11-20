import { AppContext } from '../appContext'
import { EventModel } from '../database/models/event'
import { EventGenreModel } from '../database/models/eventGenre'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../database/models/image'
import { ImageService } from '../service/imageService'

export type CreateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: String
    genreIds?: number[]
    image?: Promise<FileUpload>
    imageUrl?: string
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
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    return new Promise<number>(async (resolve, reject) => {
        try {
            if (input.image) {
                input.imageUrl = await imageService.storeFile(input.image)
                delete input.image
            }
            const eventId = await eventModel.createEvent(input)
            await eventGenreModel.setGenresForAnEvent(eventId, input.genreIds)
            resolve(eventId)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
