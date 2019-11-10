import { AppContext } from "../appContext";
import { ClubModel } from "../database/models/club";

export type CreateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    link?: string
    name: string
    region?: string
    specials?: string
}

export function createClub(appContext: AppContext, input: CreateClubInput) {
    const { db } = appContext
    const clubModel = new ClubModel(db);
    return clubModel.createClub(input)
}