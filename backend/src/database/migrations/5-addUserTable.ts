import { DbScript } from "../../../databaseConfig";

export const addUserTable: DbScript = {
    name: 'add-user-table',
    async up(db) {
        await db.run(`
            CREATE TABLE IF NOT EXISTS user_table (
                id SERIAL PRIMARY KEY,
                name text,
                password text
            )
        `)
    }
}