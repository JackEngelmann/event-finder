import { Entity, PrimaryGeneratedColumn, Column, Connection } from 'typeorm'

@Entity('clubimage')
export class ClubImageDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    clubId!: number

    @Column()
    imageUrl!: string
}

export class ClubImageModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async setImageUrlsForClub(clubId: number, imageUrls = [] as string[]) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.deleteClubImages(clubId)
                await this.insertClubImages(clubId, imageUrls)
                resolve()
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }

    private async deleteClubImages(clubId: number) {
        const clubImages = await this.connection.manager.find(
            ClubImageDataModel,
            { clubId }
        )
        await this.connection.manager.remove(clubImages)
    }

    private async insertClubImages(clubId: number, imageUrls: string[]) {
        const clubImages = imageUrls.map(imageUrl => {
            const clubImage = new ClubImageDataModel()
            clubImage.clubId = clubId
            clubImage.imageUrl = imageUrl
            return clubImage
        })
        await this.connection.manager.save(clubImages)
    }

    async getImageUrlsForClub(clubId: number) {
        const clubImages = await this.connection.manager.find(
            ClubImageDataModel,
            { clubId }
        )
        return clubImages.map(e => e.imageUrl)
    }

    async clear() {
        await this.connection.manager.clear(ClubImageDataModel)
    }
}
