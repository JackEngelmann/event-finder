import { AppContext } from '../../infrastructure/appContext'
import { LinkType } from '../../link/orm/link'
import { setLinksForEvent } from '../../link/commands/setLinksForEvent'
import { EventRepository } from '../orm/event'
import { setGenresForEvent } from '../../genre/commands/setGenresForEvent'
import { setImageUrlsForEvent } from '../../image/commands/setImageUrlsForEvent'
import logger from '../../infrastructure/logger'

export type UpdateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: string
    genreIds?: number[]
    id: number
    imageUrls?: string[]
    links?: LinkType[]
    minimumAge?: number
    name: string
    priceCategory?: number
    special?: string
}

export async function updateEvent(appContext: AppContext, input: UpdateEventInput) {
    const { db } = appContext
    const eventRepository = db.getCustomRepository(EventRepository)
    try {
        await eventRepository.update(input.id, {
            admissionFee: input.admissionFee || null,
            admissionFeeWithDiscount:
                input.admissionFeeWithDiscount || null,
            amountOfFloors: input.amountOfFloors || null,
            clubId: input.clubId,
            date: input.date,
            description: input.description || null,
            id: input.id,
            minimumAge: input.minimumAge || null,
            name: input.name,
            priceCategory: input.priceCategory || null,
            special: input.special || null,
        })
        await setGenresForEvent(appContext, {
            eventId: input.id,
            genreIds: input.genreIds,
        })
        if (input.imageUrls) {
            await setImageUrlsForEvent(appContext, {
                eventId: input.id,
                imageUrls: input.imageUrls,
            })
        }
        if (input.links) {
            await setLinksForEvent(appContext, {
                eventId: input.id,
                links: input.links,
            })
        }
    } catch (error) {
        logger.error(error)
        throw error
    }
}
