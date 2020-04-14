import { ClubModel } from '../../app/components/club/orm/club'
import { getConnection } from 'typeorm'
import { EventModel } from '../../app/components/event/orm/event'

export class ClubTestBuilder {
    name: string | undefined

    async build(connectionName: string) {
        const connection = getConnection(connectionName)
        const clubModel = new ClubModel(connection)
        const clubId = await clubModel.createClub({
            name: this.name || 'Test Club',
        })
        return (await clubModel.getClub(clubId))!
    }
}

export class EventTestBuilder {
    name: string | undefined
    date: string | undefined

    async build(connectionName: string) {
        const connection = getConnection(connectionName)
        const eventModel = new EventModel(connection)
        const club = await new ClubTestBuilder().build(connectionName)
        const eventId = await eventModel.createEvent({
            clubId: club.id,
            date: this.date || 'test date',
            name: this.name || 'test event',
        })
        return (await eventModel.getEvent(eventId))!
    }
}
