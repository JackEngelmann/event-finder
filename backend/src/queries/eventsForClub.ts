import { AppContext } from '../infrastructure/appContext'
import { EventModel, EventDataModel } from '../database/entity/event'
import moment = require('moment')

export function queryEventsForClub(
    appContext: AppContext,
    clubId: number,
    fromDay: string | undefined
) {
    const { db } = appContext
    const eventModel = new EventModel(db)
    return new Promise(async (resolve, reject) => {
        try {
            const events = await eventModel.getEvents()
            const filteredEvents = events.filter(
                event =>
                    matchesClubId(event, clubId) &&
                    matchesFromDay(event, fromDay)
            )
            return resolve(filteredEvents)
        } catch (err) {
            reject(err)
        }
    })
}

function matchesClubId(event: EventDataModel, clubId: number) {
    return event.clubId === clubId
}

function matchesFromDay(event: EventDataModel, fromDay: string | undefined) {
    if (!fromDay) return true
    return moment(event.date).isSameOrAfter(moment(fromDay), 'day')
}
