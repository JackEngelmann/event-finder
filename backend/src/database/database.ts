import "reflect-metadata"
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
import { Logger } from '../logger'
import { EventImageDataModel } from "./entity/eventImage"
import { ClubImageDataModel } from "./entity/clubImage"

let startedApplyingDbScript = false

export const createDbConnection = (dbName?: any) =>
    createConnection({
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
            ClubImageDataModel
        ],
        database: dbName,
        ...databaseConfig.connectionOptions,
        logger: 'file',
    }).then(async connection => {
        if (startedApplyingDbScript) return connection
        startedApplyingDbScript = true
        await applyDbScripts(connection, databaseConfig)
        return connection
    }).catch(err => {
        const logger = new Logger()
        logger.error(err)
        throw new Error(err)
    })

export const connectionPromise = createDbConnection()
