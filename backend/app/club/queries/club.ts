import { AppContext } from '../../infrastructure/appContext'
import { ClubRepository } from '../orm/club'

export async function queryClub(appContext: AppContext, id: number) {
    const { db } = appContext
    return await db.getCustomRepository(ClubRepository).findOne(id)
}
