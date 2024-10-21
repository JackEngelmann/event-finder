import { ClubImageRepository } from '../orm/clubImage'
import { AppContext } from '../../infrastructure/appContext'

type SetImageUrlsForClubInput = {
    clubId: number
    imageUrls: string[]
}
export async function setImageUrlsForClub(
    appContext: AppContext,
    input: SetImageUrlsForClubInput
) {
    const { db } = appContext
    const { clubId, imageUrls } = input

    const clubImageRepository = db.getCustomRepository(ClubImageRepository)
    await clubImageRepository.delete({ clubId })
    if (imageUrls.length > 0) {
        await clubImageRepository.insert(
            imageUrls.map(imageUrl => ({ clubId, imageUrl }))
        )
    }
}
