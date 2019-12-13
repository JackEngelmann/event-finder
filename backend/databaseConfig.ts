import { initalData as seed_191212_1900_initialData } from './src/database/seeds/191212-1900-initialData'
import { createAdminUser as seed_191212_2000_createAdminUser } from './src/database/seeds/191212-2000-createAdminUser'
import { addGenres as seed_191212_2100_addGenres } from './src/database/seeds/191212-2100-addGenres'
import { Connection, ConnectionOptions } from 'typeorm'
import { seed_191212_2242_addGenres } from './src/database/seeds/191212-2242-addGenres'

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
            seed_191212_1900_initialData,
            seed_191212_2000_createAdminUser,
            seed_191212_2100_addGenres,
            seed_191212_2242_addGenres,
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
        migrations,
        seeds: [seed_191212_2000_createAdminUser],
        connectionOptions: {
            type: 'sqlite',
            database: ':memory:',
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
