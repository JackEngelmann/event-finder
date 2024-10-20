import { Connection, ConnectionOptions } from 'typeorm'
import { migration_191219_1657_imageUrls } from './migrations/191219-1657-imageUrls'
import { migration_initialSchema } from './migrations/initialSchema'
import { testData } from './seeds/testData'
import { migration_200414_1824_links } from './migrations/200414-1824-links'

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
    migration_200414_1824_links,
]

export function getDatabaseConfig(): DatabaseConfig {
    const isProduction = process.env.NODE_ENV === 'production'
    return {
        migrations,
        seeds: isProduction ? [] : [testData],
        connectionOptions: {
            type: 'mysql',
            database: process.env.DB_NAME!,
            host: process.env.DB_HOST!,
            username: process.env.DB_USER!,
            port: parseInt(process.env.DB_PORT!, 10),
            password: process.env.DB_PASSWORD!,
            charset: 'utf8mb4',
        }
    }
}
