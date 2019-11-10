import { DbScript } from "../../../databaseConfig"

export const createSchema: DbScript = {
    name: 'create-schema',
    async up(db) {
        await db.run(`
            CREATE TABLE IF NOT EXISTS club (
                id SERIAL PRIMARY KEY,
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
                    id SERIAL PRIMARY KEY,
                    name text NOT NULL,
                    description text,
                    date text,
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
                    id SERIAL PRIMARY KEY,
                    name text NOT NULL
                );
            `)
        return await db.run(
            `
                CREATE TABLE IF NOT EXISTS eventGenre (
                    id SERIAL PRIMARY KEY,
                    eventId INTEGER NOT NULL,
                    genreId INTEGER NOT NULL
                )
            `
        )
    }
}