import { Connection, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

    @Column({ type: 'text', nullable: true })
    imageUrl?: string | null

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

export class EventModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async createEvent(input: {
        admissionFee?: number
        admissionFeeWithDiscount?: number
        amountOfFloors?: number
        clubId: number
        date: string
        description?: String
        genreIds?: number[]
        imageUrl?: string
        link?: string
        minimumAge?: number
        name: string
        priceCategory?: number
        special?: string
    }) {
        const event = new EventDataModel()
        Object.assign(event, input)
        await this.connection.manager.save(event)

        return event.id
    }

    async deleteEvent(id: number) {
        const event = await this.connection.manager.findOneOrFail(
            EventDataModel,
            id
        )
        await this.connection.manager.remove(event)
    }

    async getEvent(id: number) {
        return await this.connection.manager.findOne(EventDataModel, id)
    }

    async getEvents() {
        return await this.connection.manager.find(EventDataModel)
    }

    async getEventsFromClub(clubId: number) {
        return await this.connection.manager.find(EventDataModel, { clubId })
    }

    async updateEvent(input: {
        admissionFee?: number
        admissionFeeWithDiscount?: number
        amountOfFloors?: number
        clubId: number
        date: string
        description?: string
        genreIds?: number[]
        id: number
        imageUrl?: string
        link?: string
        minimumAge?: number
        name: string
        priceCategory?: number
        special?: string
    }) {
        const event = await this.connection.manager.findOne(
            EventDataModel,
            input.id
        )
        if (!event) return undefined

        event.admissionFee = input.admissionFee || null
        event.admissionFeeWithDiscount = input.admissionFeeWithDiscount || null
        event.amountOfFloors = input.amountOfFloors || null
        event.clubId = input.clubId
        event.date = input.date
        event.description = input.description || null
        event.imageUrl = input.imageUrl || null
        event.link = input.link || null
        event.minimumAge = input.minimumAge || null
        event.name = input.name
        event.priceCategory = input.priceCategory || null
        event.special = input.special || null

        await this.connection.manager.save(event)
    }
}
