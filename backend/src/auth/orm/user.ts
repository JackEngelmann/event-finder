import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    EntityRepository,
    Repository,
} from 'typeorm'

@Entity('user_table')
export class UserDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    password!: string
}

@EntityRepository(UserDataModel)
export class UserRepository extends Repository<UserDataModel> {
    findUserByName(name: string) {
        return this.findOneOrFail({ name })
    }
}
