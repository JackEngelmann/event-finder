import { AppContext } from "../appContext";
import { ClubModel } from "../database/models/club";

export function queryClub(appContext: AppContext, id: number) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    return clubModel.getClub(id)
}