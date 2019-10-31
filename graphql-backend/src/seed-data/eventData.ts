import { Database } from "sqlite3"

export function insertEventsIfNoneExist(database: Database) {
    const sql = 'SELECT count() as count from event'
    database.get(sql, (err, row) => {
        if (err) throw err
        if (row.count === 0) {
            console.log('initialize events')
            insertEvents(database)
        }
    })
}

function insertEvents(database: Database) {
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
}