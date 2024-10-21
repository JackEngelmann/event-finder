import { AppContext } from '../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'

export async function queryClubs(appContext: AppContext) {
    const { db } = appContext
    return await db.getCustomRepository(ClubRepository).find()
}
