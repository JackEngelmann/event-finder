import sqlite3 from 'sqlite3'
import { insertClubsIfNoneExist } from './seed-data/clubData'
import { insertEventsIfNoneExist } from './seed-data/eventData'

sqlite3.verbose()

const DB_SOURCE = 'db.sqlite'
export const db = new sqlite3.Database(DB_SOURCE, async err => {
    if (err) {
        console.error(err.message)
        throw err
    }
    db.serialize(() => {
        createTables()
        insertClubsIfNoneExist(db)
        insertEventsIfNoneExist(db)
    })
})

async function createTables() {
    db.run(`
        CREATE TABLE IF NOT EXISTS club (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text
        )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS event (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            description text,
            date string,
            clubId integer,
            imageUrl text
        )
    `)
}
