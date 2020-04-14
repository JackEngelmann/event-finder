import { AppContext } from '../../../infrastructure/appContext'
import { ClubLinkModel } from '../orm/clubLink'
import { queryLinksForClub } from '../queries/linksForClub'
import { LinkRepository } from '../orm/link'

export async function deleteLinksForClub(
    appContext: AppContext,
    clubId: number
) {
    const linksToRemove = await queryLinksForClub(appContext, clubId)
    await appContext.db.getCustomRepository(ClubLinkModel).delete({
        clubId,
    })
    await appContext.db
        .getCustomRepository(LinkRepository)
        .remove(linksToRemove)
}
