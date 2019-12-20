import { AppContext } from "../appContext";
import { FileUpload } from "graphql-upload";
import { ImageModel } from "../database/entity/image";
import { ImageService } from "../service/imageService";

export type UpladImageInput = {
  upload: Promise<FileUpload>
}

export function uploadImage(appContext: AppContext, input: UpladImageInput) {
    const { db } = appContext
    const imageModel = new ImageModel(db)
    const imageService = new ImageService(imageModel)
    return new Promise(async (resolve, reject) => {
        try {
            const imageUrl = await imageService.storeFile(input.upload)
            resolve(imageUrl)
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}