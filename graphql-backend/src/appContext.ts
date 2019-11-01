import { Database } from "sqlite3";
import { db } from './database/database'

export type AppContext = {
    db: Database
}

export const appContext = { db }