import sqlite3 from 'sqlite3'
import { createSchema } from './createSchema'
import { applySeeds } from './applySeeds'
import pg, { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export interface Database {
    get<Row = any>(text: string, values?: any): Promise<Row | undefined>
    all<Row = any>(text: string, values?: any): Promise<Row[]>
    run(text: string, values?: any): Promise<void>
}

console.log(process.env.DATABASE_URL)

class PostgresDatabase implements Database {
    db: pg.Client
    constructor() {
        this.db = new Client({
            connectionString: process.env.DATABASE_URL,
        })
        this.db.connect()
        this.init()
    }

    async init() {
        await createSchema(this)
        await applySeeds(this)
    }

    async get<Row>(text: string, values = []) {
        return this.db.query<Row>(text, values).then(res => res.rows[0])
    }

    async all<Row>(text: string, values = []) {
        return this.db.query<Row>(text, values).then(res => res.rows)
    }

    async run(text: string, values?: any) {
        return this.db.query(text, values).then(res => undefined).catch(err => {
            console.error('---')
            console.error(text)
            console.error(err)
            console.error('---')
        })
    }
}

class SqliteDatabase implements Database {
    db: sqlite3.Database
    constructor() {
        sqlite3.verbose()
        this.db = new sqlite3.Database(':memory:', throwOnError)
    }

    get<Row>(text: string, values = []) {
        return new Promise<Row | undefined>((resolve, reject) => {
            this.db.get(text, values, (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
    }

    all<Row>(text: string, values = []) {
        return new Promise<Row[]>((resolve, reject) => {
            this.db.all(text, values, (err, rows) => {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }

    run(text: string, values = [])  {
        return new Promise<void>((resolve, reject) => {
            this.db.run(text, values, function(err) {
                if (err) {
                    console.error('-----')
                    console.error(text)
                    console.error(err)
                    console.error('-----')
                    reject(err)
                }
                resolve()
            })
        })
    }

}

export const db = new PostgresDatabase()

export const createTestDb = async() => new Promise<Database>(async resolve => {
    const db = new SqliteDatabase()
    await createSchema(db)
    resolve(db)
})

function throwOnError(err: Error | null) {
    if (err) {
        console.error(err.message)
        throw err
    }
}
