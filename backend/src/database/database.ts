import "reflect-metadata"
import { databaseConfig } from '../../databaseConfig'
import { applyDbScripts } from './applyDbScripts'
import { createConnection } from 'typeorm'
import { ClubDataModel } from './entity/club'
import { EventDataModel } from './entity/event'
import { EventGenreDataModel } from './entity/eventGenre'
import { GenreDataModel } from './entity/genre'
import { UserDataModel } from './entity/user'
import { AppliedScriptDataModel } from './entity/appliedScripts'
import { Logger } from '../logger'

let startedApplyingDbScript = false

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
            UserDataModel,
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

export const longTextType = (() => {
    const dbType = databaseConfig.connectionOptions.type
    switch (dbType) {
        case 'mysql':
            return 'longtext'
        case 'sqlite':
            return 'text'
        default:
            throw new Error(`long text is not defined for the database type: ${dbType}`)
    }
})()