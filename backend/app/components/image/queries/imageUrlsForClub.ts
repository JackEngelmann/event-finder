import { AppContext } from '../../../infrastructure/appContext'
import { ClubImageRepository } from '../orm/clubImage'

export async function queryImageUrlsForClub(
    appContext: AppContext,
    clubId: number
) {
    const { db } = appContext
    const clubImageRepository = db.getCustomRepository(ClubImageRepository)
    const clubImages = await clubImageRepository.find({ clubId })
    return clubImages.map(clubImage => clubImage.imageUrl)
}
