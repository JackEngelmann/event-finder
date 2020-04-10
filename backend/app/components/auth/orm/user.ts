import { Entity, PrimaryGeneratedColumn, Column, Connection } from 'typeorm'

@Entity('user_table')
export class UserDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    password!: string
}

export class UserModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async getUser(id: number) {
        return await this.connection.manager.findOne(UserDataModel, id)
    }

    async getUserByName(name: string) {
        const users = await this.connection.manager.find(UserDataModel, {
            name,
        })
        if (users.length === 0) {
            throw new Error('user could not be found by name')
        }
        if (users.length > 1) {
            throw new Error('found multipe users with the name')
        }
        return users[0]
    }
}
