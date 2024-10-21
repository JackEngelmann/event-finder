import { DbScript } from '../infrastructure/database'

export const migration_initialSchema: DbScript = {
    name: 'initialSchema',
    async up(connection) {
        await connection.query(`
            CREATE TABLE club (
                address text,
                contact text,
                description text CHARACTER SET utf8mb4,
                email text,
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                imageUrl text,
                link text,
                name varchar(255) NOT NULL,
                region text,
                specials text CHARACTER SET utf8mb4
            ) CHARSET=utf8;
        `)

        await connection.query(`
            CREATE TABLE event (
                admissionFee decimal(10,0) DEFAULT NULL,
                admissionFeeWithDiscount decimal(10,0) DEFAULT NULL,
                amountOfFloors int(11) DEFAULT NULL,
                clubId int(11) NOT NULL,
                date varchar(255) NOT NULL,
                description text CHARACTER SET utf8mb4,
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                imageUrl text,
                link text,
                minimumAge int(11) DEFAULT NULL,
                name varchar(255) NOT NULL,
                priceCategory int(11) DEFAULT NULL,
                special text CHARACTER SET utf8mb4
            ) CHARSET=utf8;
        `)

        await connection.query(`
            CREATE TABLE eventgenre (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                eventId int(11) NOT NULL,
                genreId int(11) NOT NULL
            ) CHARSET=utf8;
        `)

        await connection.query(`
            CREATE TABLE genre (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                name varchar(255) NOT NULL
            ) CHARSET=utf8;
        `)

        await connection.query(`
            CREATE TABLE image (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                dataUrl longtext NOT NULL
            ) CHARSET=utf8;
        `)

        await connection.query(`
            CREATE TABLE user_table (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                name varchar(255) NOT NULL,
                password varchar(255) NOT NULL
            ) CHARSET=utf8;
        `)
    },
}
