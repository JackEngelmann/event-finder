import express from 'express'
import { Connection, getConnection } from 'typeorm'
import { ClubRepository } from '../club/orm/club'
import { EventRepository } from '../event/orm/event'

const app = express()

app.get('/sitemap.xml', async (req, res) => {
    const connection = getConnection()
    const sitemapXml = await generateSitemapXml(connection)
    res.type('xml')
    res.send(sitemapXml)
})

export default app

async function generateSitemapXml(connection: Connection) {
    const events = await getConnection()
        .getCustomRepository(EventRepository)
        .find()
    const clubs = await getConnection()
        .getCustomRepository(ClubRepository)
        .find()
    const eventEntries = events.map(event =>
        createUrlEntry(`/#/event/${event.id}`)
    )
    const clubEntries = clubs.map(club => createUrlEntry(`/#/club/${club.id}`))
    const entries = [
        '/',
        createUrlEntry('/#/impressum'),
        createUrlEntry('/#/data-policy'),
        createUrlEntry('/#/contact'),
        ...eventEntries,
        ...clubEntries,
    ]
    return createXml(entries)
}

function createXml(entries: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${entries.join('\n')}
          </urlset>
      `
}

function createUrlEntry(url: string) {
    return `<url><loc>https://localparty.de${url}</loc></url>`
}
