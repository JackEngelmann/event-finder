import { getConnection } from 'typeorm'
import { GenreRepository } from '../../../src/genre/orm/genre'

export class GenreTestBuilder {
    name: string | undefined

    setName(name: string) {
        this.name = name
        return this
    }

    async build(connectionName: string) {
        const connection = getConnection(connectionName)
        const genre = await connection
            .getCustomRepository(GenreRepository)
            .createAndSave({
                name: this.name || 'Test Genre',
            })
        return genre
    }
}

export function createTestGenre() {
    return new GenreTestBuilder()
}
