import express from 'express'
import { applyDbScripts } from '../scripts/commands/applyDbScripts'
import { resetAuthTables } from '../auth/commands/resetAuthTables'
import { AppContext } from '../infrastructure/appContext'
import { resetClubTables } from '../club/commands/resetClubTables'
import { resetEventTables } from '../event/commands/resetEventTables'
import { resetGenreTables } from '../genre/commands/resetGenreTables'
import { resetImageTables } from '../image/commands/resetImageTables'
import { getConnection } from 'typeorm'
import { resetLinkTables } from '../link/commands/resetLinkTables'
import logger from '../infrastructure/logger'
import { getSeeds } from '../infrastructure/database'

const app = express()

if (process.env.NODE_ENV !== 'production') {
    app.get('/', async (req, res) => {
        try {
            logger.info('reset tables')
            const appContext = {
                isAdmin: true,
                db: getConnection(),
            }
            await resetTables(appContext)
            logger.info('apply seeds')
            await applySeeds()
            res.send('Done')
        } catch (err) {
            res.send(err)
        }
    })
}

async function resetTables(appContext: AppContext) {
    await resetAuthTables(appContext)
    await resetClubTables(appContext)
    await resetEventTables(appContext)
    await resetGenreTables(appContext)
    await resetImageTables(appContext)
    await resetLinkTables(appContext)
}
async function applySeeds() {
    await applyDbScripts(getSeeds(), true)
}

export default app
