import { Express } from 'express'
import { SitemapGenerator } from '../service/sitemapGenerator'
import { getDbConnection } from '../database/database'

export function addSitemapRoute(
    app: Express,
) {
    app.get('/sitemap.xml', async (req, res) => {
        const connection = await getDbConnection()
        const sitemapGenerator = new SitemapGenerator(connection)
        const sitemapXml = await sitemapGenerator.generateSitemapXml()
        res.type('xml')
        res.send(sitemapXml)
    })
}
