import {
    PrimaryGeneratedColumn,
    Column,
    Repository,
    EntityRepository,
    Entity,
} from 'typeorm'

@Entity('clublink')
export class ClubLinkDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    clubId!: number

    @Column()
    linkId!: number
}

@EntityRepository(ClubLinkDataModel)
export class ClubLinkModel extends Repository<ClubLinkDataModel> {}
