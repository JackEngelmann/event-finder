import { Database } from "sqlite3"

const clubNames = [
    'Kathys Garage',
    'Stolperdiele',
    'LOBO',
    'Kraftwerk Mitte',
    'Downtown',
    'Rosis',
    'Altes Wettbüro',
    'Standesamt ',
    'Gutzkow',
    'Club Mensa',
    'Rösslstube (?)',
    'Sektor',
    'Objekt klein a',
    'Blue Dance Club',
    'Gisela ',
    'Arteum',
    'Aquarium',
    'Bärenzwinger (?)',
    'My House',
    'TBA',
    'Puro ',
    'Club Neu',
    'Groovestation',
    'Wu5 ',
    'Novitatis',
    'COunt down ',
    'Club 11',
    'Traumtänzer',
    'GAG 18',
    'Borsi 34',
    'Hänge Mathe',
    'Scheune Dresden',
    'Parkhotel Dresden',
    'Paula',
    'Showboxx',
    'Eventwerk (?)',
    'Zille',
    'Chemiefabrik',
    'Reithalle Straße E',
    'Alter Schlachthof ',
    'Puschkin',
    'Tane Ju',
    'Bunker (?) ',
    'Beatpol',
    'Ostpol',
    'Der Lude',
]

export function insertClubsIfNoneExist(database: Database) {
    const sql = 'SELECT count() as count from club'
    database.get(sql, (err, row) => {
        if (err) throw err
        if (row.count === 0) {
            insertClubs(database)
        }
    })
}

function insertClubs(database: Database) {
    console.log('initialize clubs')
    const sql = 'INSERT INTO club (name) VALUES (?)'
    clubNames.forEach(clubName => {
        database.run(sql, [clubName])
    })
}