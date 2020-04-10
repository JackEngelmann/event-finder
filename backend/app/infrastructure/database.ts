import 'reflect-metadata'
import { databaseConfig } from '../../databaseConfig'
import { createConnection, Connection } from 'typeorm'
import { ClubDataModel } from '../components/club/orm/club'
import { EventDataModel } from '../components/event/orm/event'
import { EventGenreDataModel } from '../components/genre/orm/eventGenre'
import { GenreDataModel } from '../components/genre/orm/genre'
import { ImageDataModel } from '../components/image/orm/image'
import { UserDataModel } from '../components/auth/orm/user'
import { AppliedScriptDataModel } from '../components/scripts/orm/appliedScripts'
import { EventImageDataModel } from '../components/image/orm/eventImage'
import { ClubImageDataModel } from '../components/image/orm/clubImage'

export const createDbConnection = (dbName?: any) => {
    return createConnection({
        name: dbName,
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
        ],
        ...databaseConfig.connectionOptions,
        logger: 'file',
    })
}

const connectionPromise = createDbConnection()

export async function getDbConnection() {
    return await connectionPromise
}
