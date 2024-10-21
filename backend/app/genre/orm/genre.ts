import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntityRepository,
    Repository,
} from 'typeorm'
import { EventGenreDataModel } from './eventGenre'

@Entity('genre')
export class GenreDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}

@EntityRepository(GenreDataModel)
export class GenreRepository extends Repository<GenreDataModel> {
    async createAndSave(input: { name: string }) {
        const genre = this.create(input)
        return await this.save(genre)
    }
    async getGenresForEvent(eventId: number) {
        return await this.createQueryBuilder('genre')
            .innerJoin(
                EventGenreDataModel,
                'eventGenre',
                'eventGenre.genreId = genre.id'
            )
            .where('eventGenre.eventId = :eventId', { eventId })
            .getMany()
    }
}
