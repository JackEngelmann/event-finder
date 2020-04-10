import express from 'express'
import { getDbConnection } from '../infrastructure/database'
import { Connection } from 'typeorm'
import { EventModel } from '../components/event/orm/event'
import { ClubModel } from '../components/club/orm/club'

const app = express()

app.get('/sitemap.xml', async (req, res) => {
    const connection = await getDbConnection()
    const sitemapXml = await generateSitemapXml(connection)
    res.type('xml')
    res.send(sitemapXml)
})

export default app

async function generateSitemapXml(connection: Connection) {
    const eventModel = new EventModel(connection)
    const clubModel = new ClubModel(connection)
    const events = await eventModel.getEvents()
    const clubs = await clubModel.getClubs()
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
