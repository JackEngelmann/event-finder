import { databaseConfig } from '../../databaseConfig'
import { applyDbScripts } from './applyDbScripts'
import { createConnection } from 'typeorm'
import { ClubDataModel } from './entity/club'
import { EventDataModel } from './entity/event'
import { EventGenreDataModel } from './entity/eventGenre'
import { GenreDataModel } from './entity/genre'
import { ImageDataModel } from './entity/image'
import { UserDataModel } from './entity/user'
import { AppliedScriptDataModel } from './entity/appliedScripts'

export const createDbConnection = (dbName?: any) =>
    createConnection({
        name: dbName,
        synchronize: true,
        logging: ['query', 'error', 'info', 'log', 'warn'],
        entities: [
            AppliedScriptDataModel,
            ClubDataModel,
            EventDataModel,
            EventGenreDataModel,
            GenreDataModel,
            ImageDataModel,
            UserDataModel,
        ],
        database: dbName,
        ...databaseConfig.connectionOptions,
        logger: 'file',
    }).then(async connection => {
        await applyDbScripts(connection, databaseConfig)
        return connection
    })

export const connectionPromise = createDbConnection()
