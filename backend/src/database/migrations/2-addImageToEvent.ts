import { DbScript } from "../../../databaseConfig"

export const addImageToEvent: DbScript = {
    name: 'add-image-to-event',
    async up(db) {
        await db.run(`
            CREATE TABLE IF NOT EXISTS image (
                id SERIAL PRIMARY KEY,
                dataurl text NOT NULL
            )
        `)
    }
}