import { Entity, PrimaryGeneratedColumn, Column, Connection } from "typeorm";

@Entity('appliedscript')
export class AppliedScriptDataModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}

export class AppliedScriptModel {
    private connection: Connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async createAppliedScript(input: { name: string }) {
        const appliedScript = new AppliedScriptDataModel()
        appliedScript.name = input.name
        await this.connection.manager.save(appliedScript)
        return appliedScript.id
    }

    async getAppliedScripts() {
        return await this.connection.manager.find(AppliedScriptDataModel)
    }
}