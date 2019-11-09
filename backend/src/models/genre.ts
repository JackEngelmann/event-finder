import { Database } from 'sqlite3'

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

    getGenre(id: number) {
        const sql = 'SELECT * FROM genre WHERE id = ?'
        const params = [id]
        return new Promise<GenreDataModel | undefined>((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) return reject(err)
                if (!row) {
                    return resolve(undefined)
                }
                const genre = new GenreDataModel(row)
                return resolve(genre)
            })
        })
    }

    getGenres() {
        const sql = 'SELECT * FROM genre'
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) return reject(err)
                const genres = rows.map(r => new GenreDataModel(r))
                return resolve(genres)
            })
        })
    }

    getGenresForEvent(eventId: number) {
        const sql =
            'SELECT genre.* from genre INNER JOIN eventGenre ON eventGenre.genreId = genre.id WHERE eventId = ?'
        const params = [eventId]
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) return reject(err)
                const genres = rows.map(r => new GenreDataModel(r))
                return resolve(genres)
            })
        })
    }
}
