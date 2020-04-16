import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Connection,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('appliedscript')
export class AppliedScriptDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}

@EntityRepository(AppliedScriptDataModel)
export class AppliedScriptRepository extends Repository<
    AppliedScriptDataModel
> {
    async createAndSave(input: { name: string }) {
        const appliedScript = this.create(input)
        return await this.save(appliedScript)
    }
}
