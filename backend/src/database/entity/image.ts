import { Entity, PrimaryGeneratedColumn, Column, Connection } from 'typeorm'

@Entity('image')
export class ImageDataModel {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({ type: 'longtext' })
    dataUrl!: string
}

export class ImageModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async createImage(input: { dataUrl: string }) {
        const image = new ImageDataModel()

        image.dataUrl = input.dataUrl

        await this.connection.manager.save(image)

        return image.id
    }

    async deleteImage(id: number) {
        const image = this.connection.manager.findOneOrFail(ImageDataModel, id)
        await this.connection.manager.remove(image)
    }

    async getImage(id: number) {
        return await this.connection.manager.findOne(ImageDataModel, id)
    }
}
