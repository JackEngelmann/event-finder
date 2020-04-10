import { DbScript } from '../databaseConfig'

export const addGenres: DbScript = {
    name: 'add-genres',
    async up(connection) {
        await connection.query(`
            INSERT INTO genre (name) VALUES
                ('Querbeet'),
                ('Techno'),
                ('80s'),
                ('90s'),
                ('2000s'),
                ('Apres Ski'),
                ('Schlager')
        `)
    },
}
