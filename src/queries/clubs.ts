import { AppContext } from "../appContext"
import { ClubModel } from "../models/club"

export function queryClubs(appContext: AppContext) {
    const { db } = appContext
    const clubModel = new ClubModel(db);
    return clubModel.getClubs()
}
