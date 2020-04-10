import * as R from 'ramda'
import { DbScript } from '../databaseConfig'
import { ClubDataModel } from '../app/components/club/orm/club'
import { UserDataModel } from '../app/components/auth/orm/user'
import { getAdminPassword } from '../app/components/auth/authentication'
import { GenreDataModel } from '../app/components/genre/orm/genre'
import {
    randomInt,
    sampleMultipleWithoutRepition,
    crossProduct,
} from '../app/utils/random'
import moment from 'moment'
import { EventDataModel } from '../app/components/event/orm/event'
import {
    EventGenreModel,
    EventGenreDataModel,
} from '../app/components/genre/orm/eventGenre'

const AMOUNT_CLUBS = 20
const AMOUNT_EVENTS = 20
const AMOUNT_GENRES = 20
const AMOUNT_EVENT_GENRES = 40

export const testData: DbScript = {
    name: 'testData3',
    async up(connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(ClubDataModel)
            .values(R.times(createClub, AMOUNT_CLUBS))
            .execute()
        await connection
            .createQueryBuilder()
            .insert()
            .into(UserDataModel)
            .values([
                {
                    name: 'admin',
                    password: await getAdminPassword(),
                },
            ])
            .execute()
        await connection
            .createQueryBuilder()
            .insert()
            .into(GenreDataModel)
            .values(R.times(createGenre, AMOUNT_GENRES))
            .execute()
        await connection
            .createQueryBuilder()
            .insert()
            .into(EventDataModel)
            .values(R.times(createEvent, AMOUNT_EVENTS))
            .execute()
        await connection
            .createQueryBuilder()
            .insert()
            .into(EventGenreDataModel)
            .values(createEventGenres())
            .execute()
    },
}

function createGenre(idx: number) {
    return { name: `Genre ${idx}` }
}

function createClub(idx: number) {
    return {
        name: `Club ${idx}`,
        address: `Address ${idx}`,
        region: `Region ${idx}`,
        contact: `Contact ${idx}`,
        email: `Email ${idx}`,
        description: `Description ${idx}`,
        link: `www.club.de`,
    }
}

function createEvent(idx: number) {
    return {
        name: `Event ${idx}`,
        admissionFee: randomInt(5, 20),
        admissionFeeWithDiscount: randomInt(5, 20),
        amountOfFloors: randomInt(1, 4),
        clubId: randomInt(1, AMOUNT_CLUBS),
        date: moment()
            .add(randomInt(0, 7), 'day')
            .toISOString(),
        description: `Description for event ${idx}`,
        link: 'www.event.de',
        priceCategory: randomInt(1, 3),
        special: `Special ${idx}`,
    }
}

function createEventGenres() {
    const eventIds = R.range(1, AMOUNT_EVENTS + 1)
    const genreIds = R.range(1, AMOUNT_GENRES + 1)
    const combinations = crossProduct(eventIds, genreIds)
    const selected = sampleMultipleWithoutRepition(
        combinations,
        AMOUNT_EVENT_GENRES
    )
    return selected.map(([eventId, genreId]) => ({
        eventId,
        genreId,
    }))
}
