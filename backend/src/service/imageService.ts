import { FileUpload } from 'graphql-upload'
import shortid from 'shortid'
import { unlink, createWriteStream } from "fs";
import path from 'path'

export class ImageService {
    async storeFile(upload: Promise<FileUpload>): Promise<string> {
        const { createReadStream, mimetype, filename } = await upload
        const readStream = createReadStream()

        const imageId = shortid.generate()
        const newFileName = imageId + '-' + filename

        const imagePath = path.join(process.env.IMAGE_DIR_PATH!, newFileName)

        const imageUrl = `images/${newFileName}`

        await new Promise((resolve, reject) => {
            readStream.on('error', error => {
                unlink(imagePath, () => {
                    reject(error)
                })
            }).pipe(createWriteStream(imagePath))
            .on('error', reject)
            .on('finish', resolve)
        })

        return imageUrl
    }
}