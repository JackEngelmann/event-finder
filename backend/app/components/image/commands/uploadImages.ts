import { AppContext } from '../../../infrastructure/appContext'
import { FileUpload } from 'graphql-upload'
import { ImageRepository } from '../orm/image'

export type UpladImageInput = {
    upload: Promise<FileUpload>
}

export async function uploadImage(appContext: AppContext, input: UpladImageInput) {
    const { db } = appContext
    try {
        const { createReadStream, mimetype } = await input.upload
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
        const image = await db
            .getCustomRepository(ImageRepository)
            .createAndSave({ dataUrl })
        const imageUrl = `images/${image.id}`
        return imageUrl
    } catch (error) {
        console.error(error)
        throw error
    }
}
