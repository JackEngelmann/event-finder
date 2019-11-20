import { Database } from '../database/database'

export const genreFragment = `
    id
    name
`

export const eventFragment = `
    club {
        id
        name
    }
    name,
    description,
    date,
    id
    imageUrl,
    priceCategory,
    admissionFee,
    admissionFeeWithDiscount,
    link
    special,
    minimumAge,
    amountOfFloors
    genres {
        ${genreFragment}
    }
`

export const clubFragment = `
    address
    contact
    description
    email
    id
    link
    name
    region
    specials
`

export async function insertTestData(db: Database) {
    await db.run(`
        INSERT INTO club (
            name,
            address,
            region,
            contact,
            email,
            specials,
            description,
            link
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description',
            'link'
        )
    `)
    await db.run(`
        INSERT INTO club (
            name,
            address,
            region,
            contact,
            email,
            specials,
            description,
            link
        ) VALUES (
            'name',
            'address',
            'region',
            'contact',
            'email',
            'specials',
            'description',
            'link'
        )
    `)
    await db.run(`
        INSERT INTO event
        (
            name,
            description,
            date,
            clubId,
            imageUrl,
            priceCategory,
            admissionFee,
            admissionFeeWithDiscount,
            special,
            minimumAge,
            amountOfFloors
        ) 
        VALUES (
            'name',
            'description',
            'date',
            1,
            'imageUrl',
            2,
            10.0,
            20.0,
            'specials',
            18,
            4
        )
    `)
    await db.run(`
        INSERT INTO genre (name) VALUES
            ('genre1'),
            ('genre2'),
            ('genre3')
    `)
    return await db.run(`
        INSERT INTO eventGenre (eventId, genreId) VALUES (1, 1)
    `)
}
