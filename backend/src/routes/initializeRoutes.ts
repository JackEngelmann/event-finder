import { Express } from 'express'
import { addLoginRoute } from './login'
import { addSitemapRoute } from './sitemap'
import { addImagesRoute } from './images'

export function initializeRoutes(app: Express) {
    addLoginRoute(app)
    addSitemapRoute(app)
    addImagesRoute(app)
}
