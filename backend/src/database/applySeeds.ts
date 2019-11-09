import path from 'path'
import fs from 'fs'
import { Database } from './database'

const SEEDS_PATH = './seeds'

export async function applySeeds(db: Database) {
    db.run(`
        CREATE TABLE IF NOT EXISTS appliedSeeds (
            fileName text
        )
    `)
    const location = path.resolve(SEEDS_PATH)
    const appliedSeedFileNames = (await db.all('SELECT fileName from appliedSeeds')).map(r => r.fileName)
    const pendingSeedFileNames: string[] = await new Promise((resolve, reject) => {
        fs.readdir(location, (err, files) => {
            if (err) {
                reject(err)
            } else {
                const relevantFileNames = files
                    .filter(fileName => fileName.slice(-3) === 'sql')
                    .filter(fileName => !appliedSeedFileNames.includes(fileName))
                    .map(fileName => ({ fileName, id: parseInt(fileName.split('-')[0], 10) }))
                    .sort((a, b) => Math.sign(a.id - b.id))
                    .map(a => a.fileName)
                resolve(relevantFileNames)
            }
        })
    })
    let promises = pendingSeedFileNames.map(async fileName => {
        const sql = fs.readFileSync(path.join(SEEDS_PATH, fileName)).toString()
        console.log(`running seed: ${fileName}`)
        await db.run(sql)
        return await db.run('INSERT INTO appliedSeeds (fileName) VALUES (?)', [fileName])
    });
    return await Promise.all(promises)
}
