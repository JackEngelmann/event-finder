import { Database } from "../database/database"

export class EventGenreDataModel {
    id: number
    eventId: number
    genreId: number
    constructor(row: any) {
        this.id = row.id
        this.eventId = row.eventId
        this.genreId = row.genreId
    }
}

export class EventGenreModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async setGenresForAnEvent(eventId: number, genreIds = [] as number[]) {
        await this.deleteAllGenresForEvent(eventId)
        if (genreIds.length === 0) return
        return await this.insertGenresForEvent(eventId, genreIds)
    }

    private insertGenresForEvent(eventId: number, genreIds: number[]) {
        const placeholders = genreIds.map(g => '(?, ?)').join(',')
        const values = genreIds.flatMap(genreId => [eventId, genreId])
        return this.db.run(
            'insert into eventGenre (eventId, genreId) VALUES ' +
                placeholders,
            values,
        )
    }

    deleteAllGenresForEvent(eventId: number) {
        return this.db.run(
            `DELETE FROM eventGenre WHERE eventId = $eventId`,
            {
                $eventId: eventId,
            },
        )
    }
}
