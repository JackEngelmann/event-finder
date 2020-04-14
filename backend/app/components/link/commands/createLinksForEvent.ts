import { AppContext } from '../../../infrastructure/appContext'
import { LinkRepository } from '../orm/link'
import { EventLinkModel } from '../orm/eventLink'

export type CreateLinksForEventInput = {
    eventId: number
    links: { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }[]
}

export async function createLinksForEvent(
    appContext: AppContext,
    input: CreateLinksForEventInput
) {
    const { eventId } = input
    const inputResult = await appContext.db
        .getCustomRepository(LinkRepository)
        .insert(input.links)
    const eventLinksToCreate = inputResult.identifiers.map(identifier => ({
        eventId,
        linkId: identifier.id,
    }))
    await appContext.db
        .getCustomRepository(EventLinkModel)
        .insert(eventLinksToCreate)
}
