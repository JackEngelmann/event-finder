import { Connection } from 'typeorm'
import { EventModel } from '../database/entity/event'
import { ClubModel } from '../database/entity/club'

export class SitemapGenerator {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async generateSitemapXml() {
        const eventModel = new EventModel(this.connection)
        const clubModel = new ClubModel(this.connection)
        const events = await eventModel.getEvents()
        const clubs = await clubModel.getClubs()
        const eventEntries = events.map(event =>
            this.createUrlEntry(`/#/event/${event.id}`)
        )
        const clubEntries = clubs.map(club =>
            this.createUrlEntry(`/#/club/${club.id}`)
        )
        const entries = [
            '/',
            this.createUrlEntry('/#/impressum'),
            this.createUrlEntry('/#/data-policy'),
            this.createUrlEntry('/#/contact'),
            ...eventEntries,
            ...clubEntries,
        ]
        return this.createXml(entries)
    }

    createXml(entries: string[]) {
        return `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${entries.join('\n')}
          </urlset>
      `
    }

    createUrlEntry(url: string) {
        return `<url><loc>https://localparty.de${url}</loc></url>`
    }
}
