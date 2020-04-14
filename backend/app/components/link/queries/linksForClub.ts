import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'

export async function queryLinksForClub(
    appContext: AppContext,
    clubId: number
) {
    return await appContext.db
        .getCustomRepository(LinkRepository)
        .getLinksForClub(clubId)
}
