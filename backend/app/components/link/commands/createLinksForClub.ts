import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'
import { ClubLinkRepository } from '../orm/clubLink'

export type CreateLinksForClubInput = {
    clubId: number
    links: { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }[]
}

export async function createLinksForClub(
    appContext: AppContext,
    input: CreateLinksForClubInput
) {
    const { clubId } = input

    if (input.links.length === 0) return

    const insertPromises = input.links.map(async l => {
        const insertResult = await appContext.db
            .getCustomRepository(LinkRepository)
            .insert(l)
        return insertResult.identifiers[0].id as number
    })
    const linkIds = await Promise.all(insertPromises)
    const clubLinksToCreate = linkIds.map(linkId => ({
        clubId,
        linkId,
    }))
    await appContext.db
        .getCustomRepository(ClubLinkRepository)
        .insert(clubLinksToCreate)
}
