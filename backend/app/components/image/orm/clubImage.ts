import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('clubimage')
export class ClubImageDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    clubId!: number

    @Column()
    imageUrl!: string
}

@EntityRepository(ClubImageDataModel)
export class ClubImageRepository extends Repository<ClubImageDataModel> {
    async createAndSave(input: { clubId: number; imageUrls: string[] }) {
        const clubImage = this.create(input)
        return await this.save(clubImage)
    }
}
