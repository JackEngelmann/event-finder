import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'

export async function queryLinksForEvent(
    appContext: AppContext,
    eventId: number
) {
    return await appContext.db
        .getCustomRepository(LinkRepository)
        .getLinksForEvent(eventId)
}
