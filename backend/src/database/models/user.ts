import { Database } from "../database"

export class UserDataModel {
    id: number
    name: string
    password: string
    constructor(row: any) {
        this.id = row.id
        this.name = row.name
        this.password = row.password
    }
}

export class UserModel {
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

    async getUser(id: number) {
        const sql = 'SELECT * FROM user_table WHERE id = $1'
        const params = [id]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        return new UserDataModel(row)
    }

    async getUserByName(name: string) {
        const sql = 'SELECT * FROM user_table WHERE name = $1'
        const params = [name]
        const row = await this.db.get(sql, params)
        if (!row) return undefined
        return new UserDataModel(row)
    }
}