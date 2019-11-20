import { DbScript } from "../../../databaseConfig";

export const addImageToClub: DbScript = {
    name: 'add-image-to-club',
    async up(db) {
        await db.run(`
            ALTER TABLE club ADD COLUMN imageUrl text
        `)
    }
}