import { Express } from 'express'
import { Logger } from '../logger'
import { ImageModel } from '../database/entity/image'
import { ImageService } from '../service/imageService'
import { getDbConnection } from '../database/database'

const logger = new Logger()

export function addImagesRoute(app: Express) {
    app.get('/images/:imageId', async (req, res) => {
        const connection = await getDbConnection()
        const imageId = parseInt(req.params.imageId, 10)

        logger.info(`requesting image with id ${imageId}`)
        const imageModel = new ImageModel(connection)
        const imageService = new ImageService(imageModel)

        if (Number.isNaN(imageId)) return null

        const file = await imageService.readFile(imageId)
        if (!file) return res.send(undefined)

        res.type(file.type)
        res.send(file.data)
    })
}
