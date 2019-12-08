import { Entity, Column, PrimaryGeneratedColumn, Connection } from 'typeorm'
import { Logger } from '../../logger'

const logger = new Logger()

@Entity('club')
export class ClubDataModel {
    @Column({ type: 'text', nullable: true })
    address?: string | null

    @Column({ type: 'text', nullable: true })
    contact?: string | null

    @Column({ type: 'text', nullable: true })
    description?: string | null

    @Column({ type: 'text', nullable: true })
    email?: string | null

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'text', nullable: true })
    imageUrl?: string | null

    @Column({ type: 'text', nullable: true })
    link?: string | null

    @Column()
    name!: string 

    @Column({ type: 'text', nullable: true })
    region?: string | null

    @Column({ type: 'text', nullable: true })
    specials?: string | null
}

export class ClubModel {
    private connection: Connection

    constructor(db: Connection) {
        this.connection = db
    }

    async createClub(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        imageUrl?: string
        link?: string
        name: string
        region?: string
        specials?: string
    }) {
        const club = new ClubDataModel()
        Object.assign(club, input)
        await this.connection.manager.save(club)
        return club.id
    }

    async updateClub(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        id: number
        imageUrl?: string
        link?: string
        name: string
        region?: string
        specials?: string
    }) {
        const club = await this.connection.manager.findOneOrFail<ClubDataModel>(
            'club',
            input.id
        )

        club.address = input.address || null
        club.contact = input.contact || null
        club.description = input.description || null
        club.email = input.email || null
        club.imageUrl = input.imageUrl || null
        club.link = input.link || null
        club.name = input.name
        club.region = input.region || null
        club.specials = input.specials || null

        await this.connection.manager.save(club)
    }

    async getClub(id: number) {
        const club = await this.connection.manager.findOne<ClubDataModel>('club', id)
        return club
    }

    async getClubs() {
        logger.info('club model: getClubs')
        const clubs = await this.connection.manager.find<ClubDataModel>('club')
        logger.info(JSON.stringify(clubs))
        return clubs
    }

    async deleteClub(id: number) {
        const club = await this.connection.manager.findOne<ClubDataModel>('club', id)
        await this.connection.manager.remove(club)
    }
}
