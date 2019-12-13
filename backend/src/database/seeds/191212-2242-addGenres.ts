import { DbScript } from "../../../databaseConfig";

export const seed_191212_2242_addGenres: DbScript = {
    name: '191212-2242-add-genres',
    async up(connection) {
        await connection.query(`
            INSERT INTO genre (name) VALUES
                ('RnB'),
                ('Charts'),
                ('Latin'),
                ('Black'),
                ('DnB')
        `)
    }
}