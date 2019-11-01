import { Database } from "sqlite3"

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
    imageUrl,
    priceCategory,
    admissionFee,
    admissionFeeWithDiscount,
    special,
    minimumAge,
    amountOfFloors
    genres {
        ${genreFragment}
    }
`

export const clubFragment = `
    name
    address
    region
    contact
    email
    specials
    description
    link
`

export function insertTestData(db: Database) {
    return new Promise(resolve => {
        db.serialize(() => {
            db.run(`
                    INSERT INTO club (
                        [name],
                        [address],
                        [region],
                        [contact],
                        [email],
                        [specials],
                        [description],
                        [link]
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
            db.run(`
                    INSERT INTO club (
                        [name],
                        [address],
                        [region],
                        [contact],
                        [email],
                        [specials],
                        [description],
                        [link]
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
            db.run(`
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
            db.run(`
                    INSERT INTO genre ([name]) VALUES
                        ('genre1'),
                        ('genre2'),
                        ('genre3')
                `)
            db.run(
                `
                    INSERT INTO eventGenre (eventId, genreId) VALUES (1, 1)
                `,
                () => resolve()
            )
        })
    })
}
