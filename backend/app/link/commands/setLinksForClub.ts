import { AppContext } from '../../infrastructure/appContext'
import { deleteLinksForClub } from './deleteLinksForClub'
import { createLinksForClub } from './createLinksForClub'

export type SetLinksForClubInput = {
    clubId: number
    links: { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }[]
}

export async function setLinksForClub(
    appContext: AppContext,
    input: SetLinksForClubInput
) {
    await deleteLinksForClub(appContext, input.clubId)
    await createLinksForClub(appContext, {
        clubId: input.clubId,
        links: input.links,
    })
}
