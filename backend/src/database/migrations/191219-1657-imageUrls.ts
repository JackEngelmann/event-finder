import { DbScript } from "../../../databaseConfig";

export const migration_191219_1657_imageUrls: DbScript = {
  name: '191219_1657_imageUrls',
  async up(connection) {
    await connection.query(`
      CREATE TABLE eventimage (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        eventId INT(11) NOT NULL,
        imageUrl text NOT NULL
      );
    `)

    await connection.query(`
      CREATE TABLE clubimage (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        clubId INT(11) NOT NULL,
        imageUrl text NOT NULL
      );
    `)

    await connection.query(`
        INSERT INTO eventimage (eventId, imageUrl)
          SELECT id, imageUrl
          FROM event
          WHERE imageUrl is not null
    `)

    await connection.query(`
        INSERT INTO clubimage (clubId, imageUrl)
          SELECT id, imageUrl
          FROM club
          WHERE imageUrl is not null
    `)
  }
}