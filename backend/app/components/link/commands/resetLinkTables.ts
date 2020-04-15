import { AppContext } from '../../../infrastructure/appContext'
import { getConnection } from 'typeorm'
import { LinkRepository } from '../orm/link'
import { EventLinkModel } from '../orm/eventLink'
import { ClubLinkModel } from '../orm/clubLink'
import { Logger } from '../../../infrastructure/logger'

const logger = new Logger()

export function resetLinkTables(appContext: AppContext) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await getConnection()
                .getCustomRepository(LinkRepository)
                .clear()
            await getConnection()
                .getCustomRepository(EventLinkModel)
                .clear()
            await getConnection()
                .getCustomRepository(ClubLinkModel)
                .clear()
        } catch (err) {
            logger.error(err)
            reject()
        }
    })
}
