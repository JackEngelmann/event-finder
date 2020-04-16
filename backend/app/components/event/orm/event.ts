import {
    Connection,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('event')
export class EventDataModel {
    @Column({ type: 'decimal', nullable: true })
    admissionFee?: number | null

    @Column({ type: 'decimal', nullable: true })
    admissionFeeWithDiscount?: number | null

    @Column({ type: 'int', nullable: true })
    amountOfFloors?: number | null

    @Column()
    clubId!: number

    @Column()
    date!: string

    @Column({
        type: 'text',
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
    })
    description?: string | null

    @PrimaryGeneratedColumn()
    id!: number

    // LEGACY
    @Column({ type: 'text', nullable: true })
    link?: string | null

    @Column({ type: 'int', nullable: true })
    minimumAge?: number | null

    @Column()
    name!: string

    @Column({ type: 'int', nullable: true })
    priceCategory?: number | null

    @Column({
        type: 'text',
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
    })
    special?: string | null
}

@EntityRepository(EventDataModel)
export class EventRepository extends Repository<EventDataModel> {
    async createAndSave(input: {
        admissionFee?: number
        admissionFeeWithDiscount?: number
        amountOfFloors?: number
        clubId: number
        date: string
        description?: string
        genreIds?: number[]
        minimumAge?: number
        name: string
        priceCategory?: number
        special?: string
    }) {
        const event = this.create(input)
        return await this.save(event)
    }

    async findEventsForClub(clubId: number) {
        return await this.find({ clubId })
    }
}
