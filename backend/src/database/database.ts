import pg, { Client } from 'pg'
import { databaseConfig, DatabaseConfig } from '../../databaseConfig'
import { applyDbScripts } from './applyDbScripts'

export interface Database {
    get<Row = any>(text: string, values?: any): Promise<Row | undefined>
    all<Row = any>(text: string, values?: any): Promise<Row[]>
    run(text: string, values?: any): Promise<void>
}

class PostgresDatabase implements Database {
    db: pg.Client
    constructor(
        connectionString: string,
        callback?: (database: Database) => void
    ) {
        this.db = new Client({
            connectionString,
        })
        this.db.connect().then(() => {
            if (callback) callback(this)
        })
    }

    async get<Row>(text: string, values = []) {
        return this.db
            .query<Row>(text, values)
            .then(res => res.rows[0])
            .catch(err => {
                logDatabaseError(err, text)
                return err
            })
    }

    async all<Row>(text: string, values = []) {
        return this.db
            .query<Row>(text, values)
            .then(res => res.rows)
            .catch(err => {
                logDatabaseError(err, text)
                return err
            })
    }

    async run(text: string, values?: any) {
        return this.db
            .query(text, values)
            .then(res => undefined)
            .catch(err => {
                logDatabaseError(err, text)
                return err
            })
    }
}

export const createDatabase = () =>
    new PostgresDatabase(databaseConfig.connectionString, async db => {
        console.log('appydbscripts')
        await applyDbScripts(db, databaseConfig)
    })

let testDb: PostgresDatabase | undefined = undefined
export const createTestDb = async (testDbName: string) =>
    new Promise<Database>(async resolve => {
        if (!databaseConfig.getTestConnectionString) {
            throw new Error(
                'to create a test db the getTestConnectionString must be defined in the database configuration'
            )
        }
        try {
            const client = new Client({
                connectionString: databaseConfig.connectionString,
            })
            await client.connect()
            await client.query(`DROP DATABASE IF EXISTS ${testDbName}`)
            await client.query(`CREATE DATABASE ${testDbName}`)
            await client.end()
            const db = new PostgresDatabase(
                databaseConfig.getTestConnectionString(testDbName),
                async () => {
                    await applyDbScripts(db, databaseConfig)
                    testDb = db
                    resolve(db)
                }
            )
        } catch (err) {
            console.error(err)
        }
    })

export const destroyTestDb = (testDbName: string) =>
    new Promise(async resolve => {
        if (testDb) await testDb.db.end()
        const client = new Client({
            connectionString: databaseConfig.connectionString,
        })
        await client.connect()
        await client.query(`DROP DATABASE IF EXISTS ${testDbName}`)
        await client.end()
        resolve()
    })

function logDatabaseError(errorMessage: string, sqlText: string) {
    console.error('---')
    console.error(sqlText)
    console.error('leads to this error:   ------------------')
    console.error(errorMessage)
    console.error('---')
}
