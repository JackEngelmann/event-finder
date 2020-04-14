import { AppContext } from '../../../infrastructure/appContext'
import { EventLinkModel } from '../orm/eventLink'
import { queryLinksForEvent } from '../queries/linksForEvent'
import { LinkRepository } from '../orm/link'

export async function deleteLinksForEvent(
    appContext: AppContext,
    eventId: number
) {
    const linksToRemove = await queryLinksForEvent(appContext, eventId)
    await appContext.db.getCustomRepository(EventLinkModel).delete({
        eventId,
    })
    await appContext.db
        .getCustomRepository(LinkRepository)
        .remove(linksToRemove)
}
