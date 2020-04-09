import { AppContext } from '../infrastructure/appContext'
import { ClubModel } from '../database/entity/club'
import { FileUpload } from 'graphql-upload'
import { ClubImageModel } from '../database/entity/clubImage'

export type UpdateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    id: number
    image?: Promise<FileUpload>
    imageUrls?: string[]
    link?: string
    name: string
    region?: string
    specials?: string
}

export function updateClub(appContext: AppContext, input: UpdateClubInput) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    const clubImageModel = new ClubImageModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            await clubModel.updateClub(input)
            await clubImageModel.setImageUrlsForClub(input.id, input.imageUrls)
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
