import 'reflect-metadata'
import { databaseConfig } from '../../databaseConfig'
import { applyDbScripts } from './applyDbScripts'
import { createConnection, Connection } from 'typeorm'
import { ClubDataModel } from './entity/club'
import { EventDataModel } from './entity/event'
import { EventGenreDataModel } from './entity/eventGenre'
import { GenreDataModel } from './entity/genre'
import { ImageDataModel } from './entity/image'
import { UserDataModel } from './entity/user'
import { AppliedScriptDataModel } from './entity/appliedScripts'
import { EventImageDataModel } from './entity/eventImage'
import { ClubImageDataModel } from './entity/clubImage'

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
// .catch(err => {
//     const logger = new Logger()
//     logger.error(err)
//     throw new Error(err)
// })

export const connectionPromise = createDbConnection()
