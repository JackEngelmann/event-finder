import { Database } from "../database/database"

export class EventGenreDataModel {
    id: number
    eventId: number
    genreId: number
    constructor(row: any) {
        this.id = row.id
        this.eventId = row.eventid
        this.genreId = row.genreid
    }
}

export class EventGenreModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async setGenresForAnEvent(eventId: number, genreIds = [] as number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.deleteAllGenresForEvent(eventId)
                if (genreIds.length === 0) {
                    resolve()
                } else {
                    await this.insertGenresForEvent(eventId, genreIds)
                    resolve()
                }
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }

    private async insertGenresForEvent(eventId: number, genreIds: number[]) {
        const promises = genreIds.map(genreId => this.insertGenreForEvent(eventId, genreId))
        return await Promise.all(promises)
    }

    private async insertGenreForEvent(eventId: number, genreId: number) {
        return await this.db.run(
            'insert into eventGenre (eventId, genreId) VALUES ($1, $2)',
            [eventId, genreId]
        )
    }

    deleteAllGenresForEvent(eventId: number) {
        return this.db.run(
            `DELETE FROM eventGenre WHERE eventId = $1`,
            [eventId]
        )
    }
}
