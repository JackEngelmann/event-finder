import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Connection,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('eventgenre')
export class EventGenreDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    eventId!: number

    @Column()
    genreId!: number
}

@EntityRepository(EventGenreDataModel)
export class EventGenreRepository extends Repository<EventGenreDataModel> {}
