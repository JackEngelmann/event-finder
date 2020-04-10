import { Connection, ConnectionOptions } from 'typeorm'
import { migration_191219_1657_imageUrls } from './migrations/191219-1657-imageUrls'
import { migration_initialSchema } from './migrations/initialSchema'
import { testData } from './seeds/testData'

export type DbScript = {
    name: string
    up(connection: Connection): Promise<any>
}

export interface DatabaseConfig {
    migrations?: DbScript[]
    seeds?: DbScript[]
    connectionOptions: ConnectionOptions
}

const migrations: DbScript[] = [
    migration_initialSchema,
    migration_191219_1657_imageUrls,
]

const configByMode: Record<string, DatabaseConfig> = {
    production: {
        migrations,
        seeds: [],
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
        seeds: [testData],
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
        seeds: [testData],
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
