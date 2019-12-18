import { AppContext } from '../appContext'
import { EventModel } from '../database/entity/event'
import { EventGenreModel } from '../database/entity/eventGenre'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../database/entity/image'
import { ImageService } from '../service/imageService'

export type UpdateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: string
    genreIds?: number[]
    id: number
    image?: Promise<FileUpload>
    imageUrl?: string
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
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    return new Promise(async (resolve, reject) => {
        try {
            if (input.image) {
                input.imageUrl = await imageService.storeFile(input.image)
                delete input.image
            }
            await eventModel.updateEvent(input)
            await eventGenreModel.setGenresForAnEvent(input.id, input.genreIds)
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
