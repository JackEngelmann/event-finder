import { DbScript } from '../databaseConfig'

export const migration_200414_1824_links: DbScript = {
    name: '200414_1824_links',
    async up(connection) {
        await connection.query(`
            CREATE TABLE link (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                href text NOT NULL,
                type text NOT NULL
            );
        `)
        await connection.query(`
            CREATE TABLE eventlink (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                eventId INT(11) NOT NULL,
                linkId INT(11) NOT NULL
            );
        `)
    },
}
