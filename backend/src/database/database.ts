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

class PostgresDatabase implements Database {
    db: pg.Client
    constructor(connectionString: string, callback?: any) {
        this.db = new Client({
            connectionString,
        })
        this.db.connect().then(callback)
    }

    async get<Row>(text: string, values = []) {
        return this.db.query<Row>(text, values).then(res => res.rows[0]).catch((err) => {
            console.error('---------')
            console.error(text)
            console.error('---')
            console.error(err)
            console.error('---------')
            return err
        })
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

export const createDatabase = async () => {
    const db = new PostgresDatabase(process.env.DATABASE_URL!, async () => {
        await createSchema(db)
        await applySeeds(db)
    })
    return db
}

let testDb: PostgresDatabase | undefined = undefined

export const createTestDb = async (testDbName: string) => new Promise<Database>(async resolve => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        })
        await client.connect()
        await client.query(`DROP DATABASE IF EXISTS ${testDbName}`)
        await client.query(`CREATE DATABASE ${testDbName}`)
        await client.end()
        const db = new PostgresDatabase(`postgresql:postgres:postgres@localhost/${testDbName}`, async () => {
            await createSchema(db)
            testDb = db
            resolve(db)
        })
    } catch (err) {
        console.error(err)
    }
})

export const destroyTestDb = (testDbName: string) => new Promise(async (resolve) => {
    if (testDb) await testDb.db.end()
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    })
    await client.connect()
    await client.query(`DROP DATABASE IF EXISTS ${testDbName}`)
    await client.end()
    resolve()
})
