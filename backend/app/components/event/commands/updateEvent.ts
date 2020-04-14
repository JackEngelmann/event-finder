import { AppContext } from '../../../infrastructure/appContext'
import { EventModel } from '../orm/event'
import { EventGenreModel } from '../../genre/orm/eventGenre'
import { EventImageModel } from '../../image/orm/eventImage'
import { LinkType } from '../../link/orm/link'
import { setLinksForEvent } from '../../link/commands/setLinksForEvent'

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

export function updateEvent(appContext: AppContext, input: UpdateEventInput) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    const eventGenreModel = new EventGenreModel(db)
    const eventImageModel = new EventImageModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            await eventModel.updateEvent(input)
            await eventGenreModel.setGenresForAnEvent(input.id, input.genreIds)
            await eventImageModel.setImageUrlsForEvent(
                input.id,
                input.imageUrls
            )
            if (input.links) {
                await setLinksForEvent(appContext, {
                    eventId: input.id,
                    links: input.links,
                })
            }
            resolve()
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
