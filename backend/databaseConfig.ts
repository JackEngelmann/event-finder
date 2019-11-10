import { Database } from './src/database/database'
import { createSchema } from './src/database/migrations/1-createSchema'
import { initalData } from './src/database/seeds/1-initialData'

export type DbScript = {
    name: string
    up(database: Database): Promise<any>
}

export interface DatabaseConfig {
    connectionString: string
    getTestConnectionString?: (dbName: string) => string
    migrations?: DbScript[]
    seeds?: DbScript[]
}

const configByMode: Record<string, DatabaseConfig> = {
    production: {
        connectionString: process.env.DATABASE_URL!,
        migrations: [createSchema],
        seeds: [initalData]
    },
    development: {
        connectionString: 'postgresql://postgres:postgres@localhost/lieblingsclubdb',
        migrations: [createSchema],
        seeds: [initalData]
    },
    test: {
        connectionString: 'postgresql://postgres:postgres@localhost/lieblingsclubdb',
        getTestConnectionString: dbName => `postgresql:postgres:postgres@localhost/${dbName}`,
        migrations: [createSchema],
    }
}

const configForMode = configByMode[process.env.NODE_ENV!]

if (!configForMode) {
    throw new Error(`no database configuration found for the NODE_ENV mode "${process.env.NODE_ENV}"`)
}

export const databaseConfig = configForMode


