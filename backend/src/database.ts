import sqlite3 from 'sqlite3'

sqlite3.verbose()

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

const DB_SOURCE = 'db.sqlite'
const database = new sqlite3.Database(DB_SOURCE, err => {
    if (err) {
        console.error(err.message)
        throw err
    }
    console.log('Connected to SQLite database')
    initializeClubTable()
    initializeEventTable()
})

function initializeClubTable() {
    console.log('initializeClubTable')
    const sql = `
        CREATE TABLE club (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text
        )
    `
    database.run(sql, err => {
        if (err) return // table was created before
        const sql = 'INSERT INTO club (name) VALUES (?)'
        clubNames.forEach(clubName => {
            database.run(sql, [clubName])
        })
    })
}

function initializeEventTable() {
    console.log('initializeEventTable')
    const sql = `
        CREATE TABLE event (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            description text,
            date string,
            clubId integer,
            imageUrl text
        )
    `
    database.run(sql, err => {
        if (err) return // table was created before
        const sql = 'INSERT INTO event (name, description, date, clubId, imageUrl) VALUES (?, ?, ?, ?, ?)'
        database.run(sql, [
            'Highway to Hell - Halloween 2019',
`☠ HIGHWAY TO HELL ☠
Traditionell am 30.10. erwarten wir Euch wieder zu unserer spektakulären Halloween Party Part II  :
🎃 SPECIAL HALLOWEEN DEKO 🎃 GRUSEL TUNNEL  
🎃ANIMATION 🎃 MAKE UP MAKER 
🎃SPECIAL HALLOWEEN DRINK 

 ☠ ☠ ☠ LINE UP & MUSIC - 2 FLOORS ☠ ☠ ☠ 
Hip Hop, Charts, 90s, Electro,  Party Hits, Latin
#Louis_FOX . Red A . DJ T-vine
                  🚨🚨EINTRITT🚨🚨 
Eintritt frei bis 00:00 Uhr, danach mit Kostüm 3€ ohne 5€`,
            '2019-10-24T23:00:00.000Z',
            1,
            'images/eventLobo.jpg'
        ])
        database.run(sql, [
            'ROUTINE×Shape',
            `Wer dieser Tage in Form kommen will, muss Format haben. Doch der umgebende Raum ist es, in den es sich auszudehnen lohnt, so er es zulässt - und umso mehr, wenn nicht. In vollem Umfang den Rahmen zu sprengen bedeutet, das Ganze vom Rand her zu denken. Was zunächst wie der Umriss einer Hülle erscheint, entpuppt sich bei genauerer Betrachtung als das Wesen der Gestalt. Und wo schließlich alles aus dem Leim geht, wird die Dimension, wird das ganze Ausmaß der seelischen Katastrophe sichtbar. So erst bekommt die Sache Kontur. Routinen können hier helfen.`,
            '2019-10-24T23:00:00.000Z',
            2,
            'images/eventOka.jpg'
        ])
        database.run(sql, [
            'Rosis Teleparty - Girls Power',
`Rosis Music Television Sunday bringt die besten Musikvideos und größten Hits zurück auf die Leinwand.

Diesmal im Spotlight, die Girls der Pop & Rockmusik umrandet von weiteren großartigen Musikvideos weiterer Künstler

EINTRITT FREI`,
            '2019-10-24T23:00:00.000Z',
            3,
            'images/eventRosis.jpg'
        ])
    })
}

export default database