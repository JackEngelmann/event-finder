import { DatabaseConfig } from '../../databaseConfig'
import { Connection } from 'typeorm'
import { AppliedScriptModel } from './entity/appliedScripts'
import { Logger } from '../logger'

const logger = new Logger()

export async function applyDbScripts(
    connection: Connection,
    databaseConfig: DatabaseConfig
) {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS appliedscript (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL
        ) CHARSET=utf8;
    `)
    const scripts = [
        ...(databaseConfig.migrations || []),
        ...(databaseConfig.seeds || []),
    ]
    const appliedScriptModel = new AppliedScriptModel(connection)
    const appliedScripts = await appliedScriptModel.getAppliedScripts()
    const appliedScriptNames = appliedScripts.map(row => row.name)
    for (let script of scripts) {
        if (appliedScriptNames.includes(script.name)) {
            continue
        }
        logger.info(`will run db script: ${script.name}`)
        await script.up(connection)
        await appliedScriptModel.createAppliedScript({
            name: script.name,
        })
    }
}
