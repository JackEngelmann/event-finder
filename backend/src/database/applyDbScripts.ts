import { DatabaseConfig } from '../../databaseConfig'
import { Connection } from 'typeorm'
import { AppliedScriptModel } from './entity/appliedScripts'
import { Logger } from '../logger'

const logger = new Logger()

export async function applyDbScripts(
    connection: Connection,
    databaseConfig: DatabaseConfig
) {
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
        try {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`will run db script: ${script.name}`)
            }
            logger.info(`will run db script: ${script.name}`)
            await script.up(connection)
            await appliedScriptModel.createAppliedScript({
                name: script.name
            })
        } catch (err) {
            console.error(err)
            logger.error(err)
        }
    }
}
