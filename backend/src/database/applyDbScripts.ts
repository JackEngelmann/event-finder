import { DatabaseConfig, DbScript } from '../../databaseConfig'
import { Connection } from 'typeorm'
import { AppliedScriptModel } from './entity/appliedScripts'
import { Logger } from '../logger'
import { getDbConnection } from './database'

const logger = new Logger()

export async function applyDbScripts(
    databaseConfig: DatabaseConfig
) {
    const connection = await getDbConnection()
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
    validateUniqScriptNames(scripts)
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

export function validateUniqScriptNames(scripts: DbScript[]) {
    const names = scripts.map(s => s.name)
    const uniqNames = new Set(names)
    if (uniqNames.size === names.length) return
    throw Error('Script names must be uniq!')
}