import { AppContext } from '../../../infrastructure/appContext'
import { deleteLinksForEvent } from './deleteLinksForEvent'
import { createLinksForEvent } from './createLinksForEvent'

export type SetLinksForEventInput = {
    eventId: number
    links: { type: 'FACEBOOK' | 'HOMEPAGE'; href: string }[]
}

export async function setLinksForEvent(
    appContext: AppContext,
    input: SetLinksForEventInput
) {
    await deleteLinksForEvent(appContext, input.eventId)
    await createLinksForEvent(appContext, {
        eventId: input.eventId,
        links: input.links,
    })
}
