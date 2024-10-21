import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('image')
export class ImageDataModel {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({ type: 'longtext' })
    dataUrl!: string
}

@EntityRepository(ImageDataModel)
export class ImageRepository extends Repository<ImageDataModel> {
    async createAndSave(input: { dataUrl: string }) {
        const image = this.create(input)
        return await this.save(image)
    }
}
