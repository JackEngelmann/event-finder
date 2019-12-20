import { DbScript } from "../../../databaseConfig";

export const migration_191219_1657_imageUrls: DbScript = {
  name: '191219_1658_imageUrls',
  async up(connection) {
    await connection.query(`
      CREATE TABLE eventimage (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        eventId INT(6) UNSIGNED NOT NULL,
        imageUrl text NOT NULL
      )
    `)
    await connection.query(`
      CREATE TABLE clubimage (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        clubId INT(6) UNSIGNED NOT NULL,
        imageUrl text NOT NULL
      )
    `)
  }
}