import {
    PrimaryGeneratedColumn,
    Column,
    Repository,
    EntityRepository,
    Entity,
} from 'typeorm'

@Entity('eventlink')
export class EventLinkDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    eventId!: number

    @Column()
    linkId!: number
}

@EntityRepository(EventLinkDataModel)
export class EventLinkRepository extends Repository<EventLinkDataModel> {}
