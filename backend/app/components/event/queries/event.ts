import { AppContext } from '../../../infrastructure/appContext'
import { EventRepository } from '../orm/event'

export async function queryEvent(appContext: AppContext, id: number) {
    const { db } = appContext
    return await db.getCustomRepository(EventRepository).findOne({ id })
}
