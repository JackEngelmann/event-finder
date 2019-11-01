import { Database } from 'sqlite3'

export function createSchema(db: Database) {
    return new Promise(resolve => {
        db.serialize(() => {
            db.run(`
            CREATE TABLE IF NOT EXISTS club (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text NOT NULL,
                address text,
                region text,
                contact text,
                email text,
                specials text,
                description text,
                link text
            )
        `)
            db.run(`
            CREATE TABLE IF NOT EXISTS event (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                [name] text NOT NULL,
                [description] text,
                [date] string,
                clubId integer,
                imageUrl text,
                priceCategory integer,
                admissionFee float,
                admissionFeeWithDiscount float,
                special text,
                minimumAge integer,
                amountOfFloors integer
            )
        `)
            db.run(`
            CREATE TABLE IF NOT EXISTS genre (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name test NOT NULL
            );
        `)
            db.run(
                `
            CREATE TABLE IF NOT EXISTS eventGenre (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                eventId INTEGER NOT NULL,
                genreId INTEGER NOT NULL
            )
        `,
                () => resolve()
            )
        })
    })
}
