import 'reflect-metadata'
import { databaseConfig } from '../../databaseConfig'
import { createConnection, getConnectionManager } from 'typeorm'
import { ClubDataModel, ClubModel } from '../components/club/orm/club'
import { EventDataModel } from '../components/event/orm/event'
import { EventGenreDataModel } from '../components/genre/orm/eventGenre'
import { GenreDataModel } from '../components/genre/orm/genre'
import { ImageDataModel } from '../components/image/orm/image'
import { UserDataModel } from '../components/auth/orm/user'
import { AppliedScriptDataModel } from '../components/scripts/orm/appliedScripts'
import { EventImageDataModel } from '../components/image/orm/eventImage'
import { ClubImageDataModel } from '../components/image/orm/clubImage'
import { LinkDataModel, LinkRepository } from '../components/link/orm/link'
import {
    EventLinkDataModel,
    EventLinkModel,
} from '../components/link/orm/eventLink'
import {
    ClubLinkDataModel,
    ClubLinkModel,
} from '../components/link/orm/clubLink'

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
            EventLinkModel,
            ClubLinkDataModel,
            ClubLinkModel,
        ],
        ...databaseConfig.connectionOptions,
        logger: 'file',
    })
}
