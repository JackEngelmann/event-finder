import { DbScript } from "../../../databaseConfig";

export const addGenres: DbScript = {
    name: 'add-genres',
    async up(db) {
        await db.run(`
            INSERT INTO genre (name) VALUES
                ('Querbeet'),
                ('Techno'),
                ('80s'),
                ('90s'),
                ('2000s'),
                ('Apres Ski'),
                ('Schlager')
        `)
    }
}