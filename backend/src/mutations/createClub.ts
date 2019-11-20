import { AppContext } from '../appContext'
import { ClubModel } from '../database/models/club'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../database/models/image'
import { ImageService } from '../service/imageService'

export type CreateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    image?: Promise<FileUpload>
    imageUrl?: string
    link?: string
    name: string
    region?: string
    specials?: string
}

export function createClub(appContext: AppContext, input: CreateClubInput) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    return new Promise<number>(async (resolve, reject) => {
        try {
            if (input.image) {
                input.imageUrl = await imageService.storeFile(input.image)
                delete input.image
            }
            const clubId = await clubModel.createClub(input)
            resolve(clubId)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
