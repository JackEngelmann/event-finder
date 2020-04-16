import { AppContext } from '../../../infrastructure/appContext'
import { FileUpload } from 'graphql-upload'
import { createLinksForEvent } from '../../link/commands/createLinksForEvent'
import { LinkType } from '../../link/orm/link'
import { EventRepository } from '../orm/event'
import { setGenresForEvent } from '../../genre/commands/setGenresForEvent'
import { setImageUrlsForEvent } from '../../image/commands/setImageUrlsForEvent'

export type CreateEventInput = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    clubId: number
    date: string
    description?: string
    genreIds?: number[]
    image?: Promise<FileUpload>
    imageUrls?: string[]
    links?: LinkType[]
    minimumAge?: number
    name: string
    priceCategory?: number
    special?: string
}

export function createEvent(appContext: AppContext, input: CreateEventInput) {
    const { db } = appContext
    return new Promise<number>(async (resolve, reject) => {
        try {
            const event = await db
                .getCustomRepository(EventRepository)
                .createAndSave(input)
            await setGenresForEvent(appContext, {
                eventId: event.id,
                genreIds: input.genreIds,
            })
            if (input.imageUrls) {
                setImageUrlsForEvent(appContext, {
                    eventId: event.id,
                    imageUrls: input.imageUrls,
                })
            }
            if (input.links) {
                await createLinksForEvent(appContext, {
                    eventId: event.id,
                    links: input.links,
                })
            }
            resolve(event.id)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
