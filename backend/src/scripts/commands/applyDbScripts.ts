import { DbScript } from '../../infrastructure/database'
import { AppliedScriptRepository } from '../orm/appliedScripts'
import { getConnection } from 'typeorm'


export async function applyDbScripts(
    scripts: DbScript[],
    ignoreAppliedScripts?: boolean
) {
    const connection = getConnection()
    const appliedScriptRepository = connection.getCustomRepository(
        AppliedScriptRepository
    )
    await connection.query(`
        CREATE TABLE IF NOT EXISTS appliedscript (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL
        ) CHARSET=utf8;
    `)
    validateUniqScriptNames(scripts)
    const appliedScripts = await appliedScriptRepository.find()
    const appliedScriptNames = appliedScripts.map(row => row.name)
    for (let script of scripts) {
        if (appliedScriptNames.includes(script.name) && !ignoreAppliedScripts) {
            continue
        }
        await script.up(connection)
        await appliedScriptRepository.createAndSave({ name: script.name })
    }
}

export function validateUniqScriptNames(scripts: DbScript[]) {
    const names = scripts.map(s => s.name)
    const uniqNames = new Set(names)
    if (uniqNames.size === names.length) return
    throw Error('Script names must be uniq!')
}
