import { AppContext } from '../../../infrastructure/appContext'
import { FileUpload } from 'graphql-upload'
import { ImageModel } from '../orm/image'

export type UpladImageInput = {
    upload: Promise<FileUpload>
}

export function uploadImage(appContext: AppContext, input: UpladImageInput) {
    const { db } = appContext
    const imageModel = new ImageModel(db)
    return new Promise(async (resolve, reject) => {
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
            const id = await imageModel.createImage({ dataUrl })
            const imageUrl = `images/${id}`
            resolve(imageUrl)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}
