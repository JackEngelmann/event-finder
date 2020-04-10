import { initalData as seed_191212_1900_initialData } from './seeds/191212-1900-initialData'
import { createAdminUser as seed_191212_2000_createAdminUser } from './seeds/191212-2000-createAdminUser'
import { addGenres as seed_191212_2100_addGenres } from './seeds/191212-2100-addGenres'
import { Connection, ConnectionOptions } from 'typeorm'
import { seed_191212_2242_addGenres } from './seeds/191212-2242-addGenres'
import { migration_191219_1657_imageUrls } from './migrations/191219-1657-imageUrls'
import { migration_initialSchema } from './migrations/initialSchema'

export type DbScript = {
    name: string
    up(connection: Connection): Promise<any>
}

export interface DatabaseConfig {
    migrations?: DbScript[]
    seeds?: DbScript[]
    connectionOptions: ConnectionOptions
}

const migrations: DbScript[] = []

const configByMode: Record<string, DatabaseConfig> = {
    production: {
        migrations,
        seeds: [
            seed_191212_1900_initialData,
            seed_191212_2000_createAdminUser,
            seed_191212_2100_addGenres,
            seed_191212_2242_addGenres,
            /**
             * TODO: supper ugly to do migration is seed here!
             */
            migration_191219_1657_imageUrls,
        ],
        connectionOptions: {
            type: 'mysql',
            database: process.env.DATABASE!,
            username: process.env.DBUSERNAME!,
            host: process.env.DBHOST!,
            port: parseInt(process.env.DBPORT!, 10),
            password: process.env.DBPASSWORD,
            charset: 'utf8mb4',
        },
    },
    development: {
        migrations,
        seeds: [
            migration_initialSchema,
            seed_191212_1900_initialData,
            seed_191212_2000_createAdminUser,
            seed_191212_2100_addGenres,
            seed_191212_2242_addGenres,
            migration_191219_1657_imageUrls,
        ],
        connectionOptions: {
            type: 'mysql',
            database: 'lieblingsclub',
            host: 'localhost',
            username: 'jack',
            port: 3306,
            charset: 'utf8mb4',
        },
    },
    test: {
        migrations: [migration_initialSchema, migration_191219_1657_imageUrls],
        seeds: [seed_191212_2000_createAdminUser],
        connectionOptions: {
            type: 'mysql',
            host: 'localhost',
            database: 'lieblingsclubtest',
            username: 'jack',
            port: 3306,
            charset: 'utf8mb4',
        },
    },
}

const configForMode = configByMode[process.env.NODE_ENV!]

if (!configForMode) {
    throw new Error(
        `no database configuration found for the NODE_ENV mode "${process.env.NODE_ENV}"`
    )
}

export const databaseConfig = configForMode
