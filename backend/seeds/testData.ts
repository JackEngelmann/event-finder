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
    sample,
} from '../app/utils/random'
import moment from 'moment'
import { EventDataModel } from '../app/components/event/orm/event'
import { EventGenreDataModel } from '../app/components/genre/orm/eventGenre'
import { EventImageDataModel } from '../app/components/image/orm/eventImage'
import { Connection } from 'typeorm'
import { LinkDataModel } from '../app/components/link/orm/link'
import { EventLinkDataModel } from '../app/components/link/orm/eventLink'
import { ClubLinkDataModel } from '../app/components/link/orm/clubLink'

const AMOUNT_CLUBS = 20
const AMOUNT_EVENTS = 20
const AMOUNT_GENRES = 20
const AMOUNT_EVENT_GENRES = 40

export const testData: DbScript = {
    name: 'testData3',
    async up(connection) {
        await createClubs(connection)
        await createUsers(connection)
        await createGenres(connection)
        await createEvents(connection)
        await createEventGenres(connection)
        await createEventImages(connection)
        await createEventLinks(connection)
        await createClubLinks(connection)
    },
}

async function createClubs(connection: Connection) {
    const values = R.times(
        idx => ({
            name: `Club ${idx}`,
            address: `Address ${idx}`,
            region: `Region ${idx}`,
            contact: `Contact ${idx}`,
            email: `Email ${idx}`,
            description: `Description ${idx}`,
            link: `www.club.de`,
        }),
        AMOUNT_CLUBS
    )
    await connection
        .createQueryBuilder()
        .insert()
        .into(ClubDataModel)
        .values(values)
        .execute()
}

async function createEvents(connection: Connection) {
    const values = R.times(
        idx => ({
            name: `Event ${idx}`,
            admissionFee: randomInt(5, 20),
            admissionFeeWithDiscount: randomInt(5, 20),
            amountOfFloors: randomInt(1, 4),
            clubId: randomInt(1, AMOUNT_CLUBS),
            date: moment()
                .add(randomInt(0, 7), 'day')
                .toISOString(),
            description: `Description for event ${idx}`,
            link: `www.event-${idx}.de`,
            priceCategory: randomInt(1, 3),
            special: `Special ${idx}`,
        }),
        AMOUNT_EVENTS
    )
    await connection
        .createQueryBuilder()
        .insert()
        .into(EventDataModel)
        .values(values)
        .execute()
}

async function createEventGenres(connection: Connection) {
    const eventIds = R.range(1, AMOUNT_EVENTS + 1)
    const genreIds = R.range(1, AMOUNT_GENRES + 1)
    const combinations = crossProduct(eventIds, genreIds)
    const selected = sampleMultipleWithoutRepition(
        combinations,
        AMOUNT_EVENT_GENRES
    )
    const values = selected.map(([eventId, genreId]) => ({
        eventId,
        genreId,
    }))
    await connection
        .createQueryBuilder()
        .insert()
        .into(EventGenreDataModel)
        .values(values)
        .execute()
}

async function createEventImages(connection: Connection) {
    const eventIds = R.range(1, AMOUNT_EVENTS + 1)
    const values = eventIds.flatMap(eventId => {
        return [
            {
                eventId,
                imageUrl:
                    'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg',
            },
            {
                eventId,
                imageUrl:
                    'https://cdn.pixabay.com/photo/2015/07/10/17/53/cheers-839865_960_720.jpg',
            },
        ]
    })
    await connection
        .createQueryBuilder()
        .insert()
        .into(EventImageDataModel)
        .values(values)
        .execute()
}

async function createUsers(connection: Connection) {
    const values = [{ name: 'admin', password: await getAdminPassword() }]
    await connection
        .createQueryBuilder()
        .insert()
        .into(UserDataModel)
        .values(values)
        .execute()
}

async function createGenres(connection: Connection) {
    const values = R.times(idx => ({ name: `Genre ${idx}` }), AMOUNT_GENRES)
    await connection
        .createQueryBuilder()
        .insert()
        .into(GenreDataModel)
        .values(values)
        .execute()
}

async function createEventLinks(connection: Connection) {
    const eventIds = R.range(1, AMOUNT_EVENTS + 1)
    for (let eventId of eventIds) {
        connection.transaction(async entityManger => {
            const insertResult = await entityManger
                .createQueryBuilder()
                .insert()
                .into(LinkDataModel)
                .values([
                    {
                        href: `www.event-${eventId}.de`,
                        type: sample(['FACEBOOK', 'HOMEPAGE']),
                    },
                ])
                .execute()
            const linkId = insertResult.identifiers[0].id
            await entityManger
                .createQueryBuilder()
                .insert()
                .into(EventLinkDataModel)
                .values([
                    {
                        eventId,
                        linkId,
                    },
                ])
                .execute()
        })
    }
}

async function createClubLinks(connection: Connection) {
    const clubIds = R.range(1, AMOUNT_CLUBS + 1)
    for (let clubId of clubIds) {
        connection.transaction(async entityManger => {
            const insertResult = await entityManger
                .createQueryBuilder()
                .insert()
                .into(LinkDataModel)
                .values([
                    {
                        href: `www.club-${clubId}.de`,
                        type: sample(['FACEBOOK', 'HOMEPAGE']),
                    },
                ])
                .execute()
            const linkId = insertResult.identifiers[0].id
            await entityManger
                .createQueryBuilder()
                .insert()
                .into(ClubLinkDataModel)
                .values([
                    {
                        clubId,
                        linkId,
                    },
                ])
                .execute()
        })
    }
}
