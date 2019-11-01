import sqlite3, { Database } from 'sqlite3'
import { createSchema } from './createSchema'
import { applySeeds } from './applySeeds'

sqlite3.verbose()

const DB_SOURCE = 'db.sqlite'

export const db = new sqlite3.Database(DB_SOURCE, async err => {
    if (err) {
        console.error(err.message)
        throw err
    }
    db.serialize(() => {
        createSchema(db)
        applySeeds(db)
    })
})

export const createTestDb = async() => new Promise<Database>(resolve => {
    const db = new sqlite3.Database(':memory:', async err => {
        if (err) {
            console.error(err.message)
            throw err
        }
    })
    db.serialize(async () => {
        createSchema(db)
        resolve(db)
    })
})
