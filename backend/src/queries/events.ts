import { AppContext } from '../appContext'
import moment from 'moment'
import { EventModel, EventDataModel } from '../database/entity/event'

type Filter = {
    date?: string
    clubId?: number
}

export function queryEvents(appContext: AppContext, filter?: Filter) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            const events = await eventModel.getEvents()
            if (!filter) return resolve(events)
            const filteredEvents = events.filter(
                event =>
                    matchesDateFilter(event, filter.date) &&
                    matchesClubFilter(event, filter.clubId)
            )
            return resolve(filteredEvents)
        } catch (err) {
            reject(err)
        }
    })
}

function matchesDateFilter(event: EventDataModel, date: string | undefined) {
    if (!date) return true
    return moment(event.date).isSame(moment(date), 'day')
}

function matchesClubFilter(event: EventDataModel, clubId: number | undefined) {
    if (!clubId) return true
    return event.clubId === clubId
}
