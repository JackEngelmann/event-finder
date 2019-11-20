import { DbScript } from "../../../databaseConfig";

export const addLinkToEvent: DbScript = {
    name: 'add-link-to-event',
    async up(db) {
        await db.run(`
            ALTER TABLE event ADD COLUMN link text
        `)
    }
}