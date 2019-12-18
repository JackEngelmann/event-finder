import { ImageModel } from "../database/entity/image";
import { FileUpload } from 'graphql-upload'
import { Logger } from "../logger";

type File = {
    data: Buffer
    type: string
}

const logger = new Logger()

export class ImageService {
    imageMode: ImageModel

    constructor(imageModel: ImageModel) {
        this.imageMode = imageModel
    }

    async storeFile(upload: Promise<FileUpload>): Promise<string> {
        const { createReadStream, mimetype } = await upload
        const readStream = createReadStream()
        const chunks: Uint8Array[] = []
        const dataUrl = await new Promise<string>((resolve, reject) => {
            readStream.on('data', chunk => {
                chunks.push(chunk)
            })
            readStream.on('end', () => {
                const base64 = Buffer.concat(chunks).toString('base64')
                resolve(`data:${mimetype};base64,${base64}`)
            })
        })
        const id = await this.imageMode.createImage({ dataUrl })
        return `images/${id}`
    }

    async readFile(id: number): Promise<File | undefined> {
        const image = await this.imageMode.getImage(id)
        if (!image) return undefined
        logger.info(`read file with id ${id}, its not undefined`)
        return decodeBase64Image(image.dataUrl)
    }
}

function decodeBase64Image(base64Str: string): File {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        logger.error(`invalid base64 string`)
        throw new Error('Invalid base64 string');
    }

    return {
        type: matches[1],
        data: new Buffer(matches[2], 'base64')
    }
}