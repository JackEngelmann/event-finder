import { AppContext } from '../../../infrastructure/appContext'
import { ClubModel } from '../orm/club'

export function queryClub(appContext: AppContext, id: number) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    return clubModel.getClub(id)
}
