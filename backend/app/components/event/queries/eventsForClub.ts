import { AppContext } from '../../../infrastructure/appContext'
import { EventDataModel, EventRepository } from '../orm/event'
import moment from 'moment'

export async function queryEventsForClub(
    appContext: AppContext,
    clubId: number,
    fromDay: string | undefined
) {
    const { db } = appContext
    try {
        const events = await db.getCustomRepository(EventRepository).find()
        const filteredEvents = events.filter(
            event =>
                matchesClubId(event, clubId) &&
                matchesFromDay(event, fromDay)
        )
        return filteredEvents
    } catch (error) {
        throw error
    }
}

function matchesClubId(event: EventDataModel, clubId: number) {
    return event.clubId === clubId
}

function matchesFromDay(event: EventDataModel, fromDay: string | undefined) {
    if (!fromDay) return true
    return moment(event.date).isSameOrAfter(moment(fromDay), 'day')
}
