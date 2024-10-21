import { AppContext } from '../../infrastructure/appContext'
import { queryLinksForClub } from '../queries/linksForClub'
import { LinkRepository } from '../orm/link'
import { ClubLinkRepository } from '../orm/clubLink'

export async function deleteLinksForClub(
    appContext: AppContext,
    clubId: number
) {
    const linksToRemove = await queryLinksForClub(appContext, clubId)
    await appContext.db.getCustomRepository(ClubLinkRepository).delete({
        clubId,
    })
    await appContext.db
        .getCustomRepository(LinkRepository)
        .remove(linksToRemove)
}
