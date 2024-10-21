import { AppContext } from '../../infrastructure/appContext'
import moment from 'moment'
import { EventDataModel, EventRepository } from '../orm/event'

type Filter = {
    date?: string
    clubId?: number
}

export async function queryEvents(appContext: AppContext, filter?: Filter) {
    const { db } = appContext
    try {
        const events = await db.getCustomRepository(EventRepository).find()
        if (!filter) return events
        const filteredEvents = events.filter(
            event =>
                matchesDateFilter(event, filter.date) &&
                matchesClubFilter(event, filter.clubId)
        )
        return filteredEvents
    } catch (err) {
        throw err
    }
}

function matchesDateFilter(event: EventDataModel, date: string | undefined) {
    if (!date) return true
    return moment(event.date).isSame(moment(date), 'day')
}

function matchesClubFilter(event: EventDataModel, clubId: number | undefined) {
    if (!clubId) return true
    return event.clubId === clubId
}
