import { AppContext } from '../../../infrastructure/appContext'
import { ClubModel } from '../orm/club'
import { FileUpload } from 'graphql-upload'
import { ClubImageModel } from '../../image/orm/clubImage'
import { setLinksForClub } from '../../link/commands/setLinksForClub'
import { LinkType } from '../../link/orm/link'
import { createLinksForClub } from '../../link/commands/createLinksForClub'

export type CreateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    image?: Promise<FileUpload>
    imageUrls?: string[]
    links?: LinkType[]
    name: string
    region?: string
    specials?: string
}

export function createClub(appContext: AppContext, input: CreateClubInput) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    const clubImageModel = new ClubImageModel(db)
    return new Promise<number>(async (resolve, reject) => {
        try {
            const clubId = await clubModel.createClub(input)
            await clubImageModel.setImageUrlsForClub(clubId, input.imageUrls)
            if (input.links) {
                await createLinksForClub(appContext, {
                    links: input.links,
                    clubId,
                })
            }
            resolve(clubId)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
