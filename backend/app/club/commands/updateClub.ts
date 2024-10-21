import { AppContext } from '../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'
import { FileUpload } from 'graphql-upload'
import { LinkType } from '../../link/orm/link'
import { setLinksForClub } from '../../link/commands/setLinksForClub'
import { setImageUrlsForClub } from '../../image/commands/setImageUrlsForClub'
import logger from '../../infrastructure/logger'

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

export async function updateClub(appContext: AppContext, input: UpdateClubInput) {
    const { db } = appContext
    const clubRepository = db.getCustomRepository(ClubRepository)
    try {
        await clubRepository.update(input.id, {
            address: input.address || null,
            contact: input.contact || null,
            description: input.description || null,
            email: input.email || null,
            id: input.id,
            name: input.name,
            region: input.region || null,
            specials: input.specials || null,
        })
        if (input.imageUrls) {
            await setImageUrlsForClub(appContext, {
                clubId: input.id,
                imageUrls: input.imageUrls,
            })
        }
        if (input.links) {
            await setLinksForClub(appContext, {
                clubId: input.id,
                links: input.links,
            })
        }
    } catch (error) {
        logger.error(error)
        throw error
    }
}
