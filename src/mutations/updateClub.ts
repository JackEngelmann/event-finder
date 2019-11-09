import { AppContext } from '../appContext'
import { ClubModel } from '../models/club'

export type UpdateClubInput = {
    address?: string
    contact?: string
    description?: string
    email?: string
    id: number
    link?: string
    name: string
    region?: string
    specials?: string
}

export function updateClub(appContext: AppContext, input: UpdateClubInput) {
    const { db } = appContext
    const clubModel = new ClubModel(db)
    return clubModel.updateClub(input)
}
