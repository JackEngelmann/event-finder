import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('eventimage')
export class EventImageDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    eventId!: number

    @Column()
    imageUrl!: string
}

@EntityRepository(EventImageDataModel)
export class EventImageRepository extends Repository<EventImageDataModel> {}
