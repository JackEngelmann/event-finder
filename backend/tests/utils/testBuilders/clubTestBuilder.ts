import { getConnection } from 'typeorm'
import { ClubRepository } from '../../../app/components/club/orm/club'

export class ClubTestBuilder {
    name: string | undefined

    setName(name: string) {
        this.name = name
        return this
    }

    async build(connectionName: string) {
        const connection = getConnection(connectionName)
        const club = await connection
            .getCustomRepository(ClubRepository)
            .createAndSave({
                name: this.name || 'Test Club',
            })
        return club
    }
}

export function createTestClub() {
    return new ClubTestBuilder()
}
