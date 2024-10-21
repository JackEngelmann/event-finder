import { AppContext } from '../../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'
import { FileUpload } from 'graphql-upload'
import { LinkType } from '../../link/orm/link'
import { createLinksForClub } from '../../link/commands/createLinksForClub'
import { setImageUrlsForClub } from '../../image/commands/setImageUrlsForClub'
import logger from '../../../infrastructure/logger'

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

export async function createClub(appContext: AppContext, input: CreateClubInput): Promise<number> {
    try {
        const club = await appContext.db
            .getCustomRepository(ClubRepository)
            .createAndSave(input)
        const clubId = club.id
        if (input.imageUrls) {
            await setImageUrlsForClub(appContext, {
                clubId,
                imageUrls: input.imageUrls,
            })
        }
        if (input.links) {
            await createLinksForClub(appContext, {
                links: input.links,
                clubId,
            })
        }
        return clubId
    } catch (err) {
        logger.error(err)
        throw err
    }
}
