import { Entity, PrimaryGeneratedColumn, Column, Connection } from 'typeorm'
import { EventGenreModel } from './eventGenre'

@Entity('genre')
export class GenreDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}

export class GenreModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async getGenre(id: number) {
        return await this.connection.manager.findOne(GenreDataModel, id)
    }

    async getGenres() {
        return await this.connection.manager.find(GenreDataModel)
    }

    async getGenresForEvent(eventId: number) {
        const eventGenreModel = new EventGenreModel(this.connection)
        const eventGenres = await eventGenreModel.getAllEventGenresForAnEvent(
            eventId
        )
        const genreIds = eventGenres.map(e => e.genreId)
        return await this.connection.manager.findByIds(GenreDataModel, genreIds)
    }

    async clear() {
        await this.connection.manager.clear(GenreDataModel)
    }
}
