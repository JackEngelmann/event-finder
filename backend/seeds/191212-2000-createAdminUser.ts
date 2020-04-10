import { DbScript } from '../databaseConfig'
import { getAdminPassword } from '../app/components/auth/authentication'

export const createAdminUser: DbScript = {
    name: 'create-admin',
    async up(connection) {
        const password = await getAdminPassword()
        await connection.query(`
            INSERT INTO user_table (name, password) VALUES ('admin', '${password}')
        `)
    },
}
