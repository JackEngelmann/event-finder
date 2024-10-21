import { getConnection } from 'typeorm'
import { EventRepository } from '../../../src/event/orm/event'
import { ClubTestBuilder } from '../testBuilders'

export class EventTestBuilder {
    name: string | undefined
    date: string | undefined
    clubId: number | undefined

    setName(name: string) {
        this.name = name
        return this
    }

    setDate(date: string) {
        this.date = date
        return this
    }

    setClubId(clubId: number) {
        this.clubId = clubId
        return this
    }

    async build(connectionName: string) {
        const connection = getConnection(connectionName)
        let clubId = this.clubId
        if (!clubId) {
            clubId = (await new ClubTestBuilder().build(connectionName)).id
        }
        return await connection
            .getCustomRepository(EventRepository)
            .createAndSave({
                clubId: clubId!,
                date: this.date || 'test date',
                name: this.name || 'test event',
            })
    }
}

export function createTestEvent() {
    return new EventTestBuilder()
}
