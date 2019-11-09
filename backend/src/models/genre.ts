import { Database } from "../database/database"

export class GenreDataModel {
    id: number
    name: string
    constructor(row: any) {
        this.id = row.id
        this.name = row.name
    }
}

export class GenreModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async getGenre(id: number) {
        const sql = 'SELECT * FROM genre WHERE id = ?'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        return new GenreDataModel(row)
    }

    async getGenres() {
        const sql = 'SELECT * FROM genre'
        const rows = await this.db.all(sql, [])
        const genres = rows.map(r => new GenreDataModel(r))
        return genres
    }

    async getGenresForEvent(eventId: number) {
        const sql =
            'SELECT genre.* from genre INNER JOIN eventGenre ON eventGenre.genreId = genre.id WHERE eventId = ?'
        const params = [eventId]
        const rows = await this.db.all(sql, params)
        return rows.map(r => new GenreDataModel(r))
    }
}
