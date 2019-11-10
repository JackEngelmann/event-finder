import { Database } from './database'
import { DatabaseConfig } from '../../databaseConfig'

export async function applyDbScripts(
    db: Database,
    databaseConfig: DatabaseConfig
) {
    const scripts = [
        ...(databaseConfig.migrations || []),
        ...(databaseConfig.seeds || []),
    ]
    await db.run(`
        CREATE TABLE IF NOT EXISTS appliedscripts (
            scriptname text
        )
    `)
    const appliedScripts = await db.all(`
        SELECT scriptname from appliedScripts
    `)
    const appliedScriptNames = appliedScripts.map(row => row.scriptname)
    for (let script of scripts) {
        if (appliedScriptNames.includes(script.name)) {
            continue
        }
        try {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`will run db script: ${script.name}`)
            }
            await script.up(db)
            await db.run(
                `INSERT INTO appliedscripts (scriptname) VALUES ($1)`,
                [script.name]
            )
        } catch (err) {
            console.error(err)
        }
    }
}
