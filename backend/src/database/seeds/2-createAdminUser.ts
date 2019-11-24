import { DbScript } from "../../../databaseConfig";
import { getAdminPassword } from "../../authentication";

export const createAdminUser: DbScript = {
    name: 'create-admin',
    async up(db) {
        const password = await getAdminPassword()
        await db.run(`
            INSERT INTO user_table (name, password) VALUES ('admin', $1)
        `, [password])
    }
}