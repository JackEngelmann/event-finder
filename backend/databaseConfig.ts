import { initalData } from './src/database/seeds/1-initialData'
import { createAdminUser } from './src/database/seeds/2-createAdminUser'
import { addGenres } from './src/database/seeds/3-addGenres'
import { Connection, ConnectionOptions } from 'typeorm'
import { hostname } from 'os'

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
        seeds: [initalData, createAdminUser, addGenres],
        connectionOptions: {
            type: 'mysql',
            database: process.env.DATABASE!,
            username: process.env.DBUSERNAME!,
            host: process.env.DBHOST!,
            port: parseInt(process.env.DBPORT!, 10),
        }
    },
    development: {
        migrations,
        seeds: [initalData, createAdminUser, addGenres],
        connectionOptions: {
            database: 'lieblingsclub',
            type: 'mysql',
            host: 'localhost',
            username: 'jack',
            port: 3306
        }
    },
    test: {
        migrations,
        seeds: [createAdminUser],
        connectionOptions: {
            type: 'sqlite',
            database: ':memory:'
        }
    },
}

const configForMode = configByMode[process.env.NODE_ENV!]

if (!configForMode) {
    throw new Error(
        `no database configuration found for the NODE_ENV mode "${process.env.NODE_ENV}"`
    )
}

export const databaseConfig = configForMode
