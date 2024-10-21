import 'reflect-metadata'
import { Connection, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { ClubDataModel, ClubRepository } from '../components/club/orm/club'
import { EventDataModel, EventRepository } from '../components/event/orm/event'
import {
    EventGenreDataModel,
    EventGenreRepository,
} from '../components/genre/orm/eventGenre'
import { GenreDataModel, GenreRepository } from '../components/genre/orm/genre'
import { ImageDataModel, ImageRepository } from '../components/image/orm/image'
import { UserDataModel, UserRepository } from '../components/auth/orm/user'
import {
    AppliedScriptDataModel,
    AppliedScriptRepository,
} from '../components/scripts/orm/appliedScripts'
import {
    EventImageDataModel,
    EventImageRepository,
} from '../components/image/orm/eventImage'
import {
    ClubImageDataModel,
    ClubImageRepository,
} from '../components/image/orm/clubImage'
import { LinkDataModel, LinkRepository } from '../components/link/orm/link'
import {
    EventLinkDataModel,
    EventLinkRepository,
} from '../components/link/orm/eventLink'
import {
    ClubLinkDataModel,
    ClubLinkRepository,
} from '../components/link/orm/clubLink'
import { migration_initialSchema } from '../../migrations/initialSchema'
import { migration_191219_1657_imageUrls } from '../../migrations/191219-1657-imageUrls'
import { migration_200414_1824_links } from '../../migrations/200414-1824-links'
import { testData } from '../../seeds/testData'


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

export function getMigrations(): DbScript[] {
    return migrations
}

export function getSeeds(): DbScript[] {
    if (process.env.NODE_ENV === 'production') {
        return []
    }
    return [testData]
}

export async function createDbConnection(dbName?: any) {
    if (getConnectionManager().has(dbName || 'default')) {
        return
    }
    return createConnection({
        name: dbName || 'default',
        logging: ['query', 'error', 'info', 'log', 'warn'],
        entities: [
            AppliedScriptDataModel,
            ClubDataModel,
            EventDataModel,
            EventGenreDataModel,
            GenreDataModel,
            ImageDataModel,
            UserDataModel,
            EventImageDataModel,
            ClubImageDataModel,
            LinkDataModel,
            LinkRepository,
            EventLinkDataModel,
            EventLinkRepository,
            ClubLinkDataModel,
            ClubRepository,
            UserRepository,
            EventGenreRepository,
            EventRepository,
            GenreRepository,
            ClubImageRepository,
            EventImageRepository,
            ImageRepository,
            ClubLinkRepository,
            EventLinkRepository,
            AppliedScriptRepository,
        ],
        type: 'mysql',
        database: process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        username: process.env.DB_USER!,
        port: parseInt(process.env.DB_PORT!, 10),
        password: process.env.DB_PASSWORD!,
        charset: 'utf8mb4',
        logger: 'file',
    })
}
