import { Database } from './database'

export async function createSchema(db: Database) {
    await db.run(`
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
    await db.run(`
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
    await db.run(`
            CREATE TABLE IF NOT EXISTS genre (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name test NOT NULL
            );
        `)
    return await db.run(
        `
            CREATE TABLE IF NOT EXISTS eventGenre (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                eventId INTEGER NOT NULL,
                genreId INTEGER NOT NULL
            )
        `
    )
}
