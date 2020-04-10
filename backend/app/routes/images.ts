import { Logger } from '../infrastructure/logger'
import { ImageModel } from '../components/image/orm/image'
import express from 'express'
import { getConnection } from 'typeorm'

type File = {
    data: Buffer
    type: string
}

const app = express()
const logger = new Logger()

app.get('/:imageId', async (req, res) => {
    const connection = getConnection()
    const imageId = parseInt(req.params.imageId, 10)

    logger.info(`requesting image with id ${imageId}`)
    const imageModel = new ImageModel(connection)

    if (Number.isNaN(imageId)) return null

    const file = await readFile(imageModel, imageId)
    if (!file) return res.send(undefined)

    res.type(file.type)
    res.send(file.data)
})

export default app

async function readFile(
    imageModel: ImageModel,
    id: number
): Promise<File | undefined> {
    const image = await imageModel.getImage(id)
    if (!image) return undefined
    logger.info(`read file with id ${id}, its not undefined`)
    return decodeBase64Image(image.dataUrl)
}

function decodeBase64Image(base64Str: string): File {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
        logger.error(`invalid base64 string`)
        throw new Error('Invalid base64 string')
    }

    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64'),
    }
}
