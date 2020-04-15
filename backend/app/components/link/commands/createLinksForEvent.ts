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

    if (input.links.length === 0) return

    const insertPromises = input.links.map(async l => {
        const insertResult = await appContext.db
            .getCustomRepository(LinkRepository)
            .insert(l)
        return insertResult.identifiers[0].id as number
    })
    const linkIds = await Promise.all(insertPromises)
    const eventLinksToCreate = linkIds.map(linkId => ({
        eventId,
        linkId,
    }))
    await appContext.db
        .getCustomRepository(EventLinkModel)
        .insert(eventLinksToCreate)
}
