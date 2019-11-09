import { db, Database } from './database/database'

export type AppContext = {
    db: Database
}

export const appContext = { db }