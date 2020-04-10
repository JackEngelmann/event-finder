import { Entity, PrimaryGeneratedColumn, Column, Connection } from 'typeorm'

@Entity('eventgenre')
export class EventGenreDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    eventId!: number

    @Column()
    genreId!: number
}

export class EventGenreModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async setGenresForAnEvent(eventId: number, genreIds = [] as number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.deleteAllGenresForEvent(eventId)
                if (genreIds.length === 0) {
                    resolve()
                } else {
                    await this.insertGenresForEvent(eventId, genreIds)
                    resolve()
                }
            } catch (err) {
                console.error(err)
                reject(err)
            }
        })
    }

    private async insertGenresForEvent(eventId: number, genreIds: number[]) {
        const promises = genreIds.map(genreId =>
            this.insertGenreForEvent(eventId, genreId)
        )
        return await Promise.all(promises)
    }

    private async insertGenreForEvent(eventId: number, genreId: number) {
        const eventGenre = new EventGenreDataModel()
        eventGenre.eventId = eventId
        eventGenre.genreId = genreId
        await this.connection.manager.save(eventGenre)
    }

    async deleteAllGenresForEvent(eventId: number) {
        const eventGenres = await this.getAllEventGenresForAnEvent(eventId)
        await this.connection.manager.remove(eventGenres)
    }

    async getAllEventGenresForAnEvent(eventId: number) {
        return await this.connection.manager.find(EventGenreDataModel, {
            eventId,
        })
    }
}
