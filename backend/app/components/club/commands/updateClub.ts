import { AppContext } from '../../../infrastructure/appContext'
import { ClubModel } from '../orm/club'
import { FileUpload } from 'graphql-upload'
import { ClubImageModel } from '../../image/orm/clubImage'
import { LinkType } from '../../link/orm/link'
import { setLinksForClub } from '../../link/commands/setLinksForClub'

export type UpdateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    id: number
    image?: Promise<FileUpload>
    imageUrls?: string[]
    links?: LinkType[]
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
            if (input.links) {
                await setLinksForClub(appContext, {
                    clubId: input.id,
                    links: input.links,
                })
            }
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
