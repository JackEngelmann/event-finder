import { Entity, PrimaryGeneratedColumn, Column, Connection } from "typeorm";

@Entity('eventimage')
export class EventImageDataModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  eventId!: number

  @Column()
  imageUrl!: string
}

export class EventImageModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async setImageUrlsForEvent(eventId: number, imageUrls = [] as string[]) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.deleteEventImages(eventId)
                await this.insertEventImages(eventId, imageUrls)
                resolve()
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }

    private async deleteEventImages(eventId: number) {
        const eventImages = await this.connection.manager.find(EventImageDataModel, { eventId })
        await this.connection.manager.remove(eventImages)
    }

    private async insertEventImages(eventId: number, imageUrls: string[]) {
        const eventImages = imageUrls.map(imageUrl => {
            const eventImage = new EventImageDataModel()
            eventImage.eventId = eventId
            eventImage.imageUrl = imageUrl
        })
        await this.connection.manager.save(eventImages)
    }

    async getImageUrlsForEvent(eventId: number) {
        const eventImages = await this.connection.manager.find(EventImageDataModel, { eventId })
        return eventImages.map(e => e.imageUrl)
    }
}