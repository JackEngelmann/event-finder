import { AppContext } from '../../../infrastructure/appContext'
import { ClubModel } from '../orm/club'

export function queryClubs(appContext: AppContext) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    return clubModel.getClubs()
}
