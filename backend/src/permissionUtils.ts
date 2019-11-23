import bcrypt from 'bcrypt'
import { AppContext } from './appContext'

export const BCRYPT_SALT_ROUNDS = 11
export const ADMIN_PASSWORD_PLAINTEXT = 'alexfalcojack'
export const SECRET = 'wJK[>PDG8n|tuRd'

export async function getAdminPassword() {
    return bcrypt.hash(ADMIN_PASSWORD_PLAINTEXT, BCRYPT_SALT_ROUNDS)
}

export function requireAdminPermission(appContext: AppContext) {
    if (process.env.NODE_ENV !== 'test' && !appContext.isAdmin) {
        throw new Error('You need to be logged in as admin to mutate data')
    }
}

export async function isSamePassword(password1: string, password2: string) {
    console.log({ password1, password2 })
    return await bcrypt.compare(password1, password2)
}