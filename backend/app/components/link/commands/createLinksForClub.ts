import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'
import { ClubLinkModel } from '../orm/clubLink'

export type CreateLinksForClubInput = {
    clubId: number
    links: { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }[]
}

export async function createLinksForClub(
    appContext: AppContext,
    input: CreateLinksForClubInput
) {
    const { clubId } = input
    const inputResult = await appContext.db
        .getCustomRepository(LinkRepository)
        .insert(input.links)
    const clubLinksToCreate = inputResult.identifiers.map(identifier => ({
        clubId,
        linkId: identifier.id,
    }))
    await appContext.db
        .getCustomRepository(ClubLinkModel)
        .insert(clubLinksToCreate)
}
