import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('club')
export class ClubDataModel {
    @Column({ type: 'text', nullable: true })
    address?: string | null

    @Column({ type: 'text', nullable: true })
    contact?: string | null

    @Column({
        type: 'text',
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
    })
    description?: string | null

    @Column({ type: 'text', nullable: true })
    email?: string | null

    @PrimaryGeneratedColumn()
    id!: number

    // LEGACY
    @Column({ type: 'text', nullable: true })
    link?: string | null

    @Column()
    name!: string

    @Column({ type: 'text', nullable: true })
    region?: string | null

    @Column({
        type: 'text',
        nullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_general_ci',
    })
    specials?: string | null
}

@EntityRepository(ClubDataModel)
export class ClubRepository extends Repository<ClubDataModel> {
    async createAndSave(input: {
        address?: string
        contact?: string
        description?: string
        email?: string
        name: string
        region?: string
        specials?: string
    }) {
        const club = this.create(input)
        return await this.save(club)
    }
}
