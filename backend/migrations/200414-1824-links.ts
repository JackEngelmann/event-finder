import { DbScript } from '../app/infrastructure/database'

export const migration_200414_1824_links: DbScript = {
    name: '200414_1824_links-b',
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
        await connection.query(`
            CREATE TABLE clublink (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                clubId INT(11) NOT NULL,
                linkId INT(11) NOT NULL
            );
        `)
        const events = await connection.query(`SELECT id, link from event`)
        for (let event of events) {
            await connection.query(`
                INSERT INTO link (href, type) VALUES ("${event.link}", "FACEBOOK")
            `)
            await connection.query(`
                INSERT INTO eventlink (eventId, linkId) VALUES (${event.id}, LAST_INSERT_ID())
            `)
        }
        const clubs = await connection.query(`SELECT id, link from club`)
        for (let club of clubs) {
            await connection.query(`
                INSERT INTO link (href, type) VALUES ("${club.link}", "FACEBOOK")
            `)
            await connection.query(`
                INSERT INTO eventlink (eventId, linkId) VALUES (${club.id}, LAST_INSERT_ID())
            `)
        }
    },
}
