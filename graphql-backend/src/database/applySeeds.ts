import path from 'path'
import fs from 'fs'
import { Database } from "sqlite3"

const SEEDS_PATH = './seeds'

export async function applySeeds(db: Database) {
    db.run(`
        CREATE TABLE IF NOT EXISTS appliedSeeds (
            fileName text
        )
    `)
    const location = path.resolve(SEEDS_PATH)
    const appliedSeedFileNames: string[] = await new Promise((resolve, reject) => {
        db.all('SELECT fileName from appliedSeeds', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows.map(r => r.fileName))
            }
        })
    })
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
    let promises: Promise<any>[] = []
    db.serialize(() => {
        promises = pendingSeedFileNames.map(fileName => {
            return new Promise((resolve, reject) => {
                const sql = fs.readFileSync(path.join(SEEDS_PATH, fileName)).toString()
                db.run(sql, err => {
                    console.log(`running seed: ${fileName}`)
                    if (err) throw err
                    db.run('INSERT INTO appliedSeeds (fileName) VALUES (?)', [fileName], () => {
                        resolve()
                    })
                })
            })
        });
    })
    return await Promise.all(promises)
}
