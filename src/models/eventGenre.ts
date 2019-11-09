import { Database } from 'sqlite3'

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

    setGenresForAnEvent(eventId: number, genreIds = [] as number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.deleteAllGenresForEvent(eventId)
                if (genreIds.length === 0) return resolve()
                await this.insertGenresForEvent(eventId, genreIds)
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    private insertGenresForEvent(eventId: number, genreIds: number[]) {
        return new Promise((resolve, reject) => {
            const placeholders = genreIds.map(g => '(?, ?)').join(',')
            const values = genreIds.flatMap(genreId => [eventId, genreId])
            this.db.run(
                'insert into eventGenre (eventId, genreId) VALUES ' +
                    placeholders,
                values,
                err => (err ? reject(err) : resolve())
            )
        })
    }

    deleteAllGenresForEvent(eventId: number) {
        return new Promise((resolve, reject) => {
            this.db.run(
                `DELETE FROM eventGenre WHERE eventId = $eventId`,
                {
                    $eventId: eventId,
                },
                err => (err ? reject(err) : resolve())
            )
        })
    }
}
