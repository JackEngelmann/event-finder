import { DatabaseConfig } from '../../databaseConfig'
import { Connection } from 'typeorm'
import { AppliedScriptModel } from './entity/appliedScripts'

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
            await script.up(connection)
            appliedScriptModel.createAppliedScript({
                name: script.name
            })
        } catch (err) {
            console.error(err)
        }
    }
}
