import { DbScript } from "../../../databaseConfig"

export const initalData: DbScript = {
    name: 'initialData',
    async up(db) {
        await db.run(`
            INSERT INTO club (name, address, region, contact, email, specials, description, link) VALUES
            ('Kathys Garage','Alaunstraße 48 01099 Dresden','Neustadt ','0351 6567701','stefan@katysgarage.de','Biergarten','Katys Garage ist ein alternativer Szeneclub im Herzen der Dresdner Neustadt. Die Gäste sind nationale und internationale Studenten, Touristen und Dresdner. Katys Garage versteht sich als weltoffen und tolerant. Das Programmspektrum ist breit gefächert und reicht von Rock bis Elektro. Katys Garage fördert einen respektvollen Umgang im Team und unter den Gästen. Katys Garage distanziert sich von rechtem und linkem Extremismus, Rassismus, Homophobie, Gewaltverherrlichung und Frauenfeindlichkeit.','https://katysgarage.de/'),
            ('Stolperdiele','Breitscheidstr. 57 01237 Dresden','Außerhalb','01520 2687225','https://www.facebook.com/Stolperdiele','','','www.stolperdiele.de'),
            ('LOBO','','Neustadt ','','','','',''),
            ('Kraftwerk Mitte','','Friedrichstadt','','','','',''),
            ('Downtown','','Neustadt ','','','','',''),
            ('Rosis','','Neustadt ','','','','',''),
            ('Altes Wettbüro','','','','','','',''),
            ('Standesamt ','','','','','','',''),
            ('Gutzkow','','Uni','','','','',''),
            ('Club Mensa','','Uni','','','','',''),
            ('Rösslstube (?)','','Friedrichstadt','','','','',''),
            ('Sektor','','Industriegelände','','','','',''),
            ('Objekt klein a','','Industriegelände','','','','',''),
            ('Blue Dance Club','','Altstadt','','','','',''),
            ('Gisela ','','Außerhalb','','','','',''),
            ('Arteum','','Außerhalb','','','','',''),
            ('Aquarium','','Uni','','','','',''),
            ('Bärenzwinger (?)','','Altstadt','','','','',''),
            ('My House','','Elbe','','','','',''),
            ('TBA','','Neustadt','','','','',''),
            ('Puro ','','Elbe','','','','',''),
            ('Club Neu','','Elbe','','','','',''),
            ('Groovestation','','Neustadt','','','','',''),
            ('Wu5 ','','Uni','','','','',''),
            ('Novitatis','','Uni','','','','',''),
            ('COunt down ','','Uni','','','','',''),
            ('Club 11','','Uni','','','','',''),
            ('Traumtänzer','','Uni','','','','',''),
            ('GAG 18','','Uni','','','','',''),
            ('Borsi 34','','','','','','',''),
            ('Hänge Mathe','','','','','','',''),
            ('Scheune Dresden','','Neustadt','','','','',''),
            ('Parkhotel Dresden','','','','','','',''),
            ('Paula','','','','','','',''),
            ('Showboxx','','Elbe','','','','',''),
            ('Eventwerk (?)','','','','','','',''),
            ('Zille','','','','','','',''),
            ('Chemiefabrik','','','','','','',''),
            ('Reithalle Straße E','','','','','','',''),
            ('Alter Schlachthof ','','Elbe','','','','',''),
            ('Puschkin','','Elbe','','','','',''),
            ('Tane Ju','','','','','','',''),
            ('Bunker (?) ','','','','','','',''),
            ('Beatpol','','','','','','',''),
            ('Ostpol','','','','','','',''),
            ('Der Lude','','Neustadt','','','','','');
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
            VALUES 
            (
                    'Highway to Hell - Halloween 2019',
            '☠ HIGHWAY TO HELL ☠
            Traditionell am 30.10. erwarten wir Euch wieder zu unserer spektakulären Halloween Party Part II  :
            🎃 SPECIAL HALLOWEEN DEKO 🎃 GRUSEL TUNNEL  
            🎃ANIMATION 🎃 MAKE UP MAKER 
            🎃SPECIAL HALLOWEEN DRINK 

            ☠ ☠ ☠ LINE UP & MUSIC - 2 FLOORS ☠ ☠ ☠ 
            Hip Hop, Charts, 90s, Electro,  Party Hits, Latin
            #Louis_FOX . Red A . DJ T-vine
                            🚨🚨EINTRITT🚨🚨 
            Eintritt frei bis 00:00 Uhr, danach mit Kostüm 3€ ohne 5€',
                    '2019-11-07T23:00:00.000Z',
                    1,
                    'images/eventLobo.jpg',
                    1,
                    5.0,
                    3.0,
                    'Eintritt frei bis 00:00',
                    18,
                    3
                ),
                (
                    'ROUTINE×Shape',
                    'Wer dieser Tage in Form kommen will, muss Format haben. Doch der umgebende Raum ist es, in den es sich auszudehnen lohnt, so er es zulässt - und umso mehr, wenn nicht. In vollem Umfang den Rahmen zu sprengen bedeutet, das Ganze vom Rand her zu denken. Was zunächst wie der Umriss einer Hülle erscheint, entpuppt sich bei genauerer Betrachtung als das Wesen der Gestalt. Und wo schließlich alles aus dem Leim geht, wird die Dimension, wird das ganze Ausmaß der seelischen Katastrophe sichtbar. So erst bekommt die Sache Kontur. Routinen können hier helfen.',
                    '2019-11-07T23:00:00.000Z',
                    2,
                    'images/eventOka.jpg',
                    2,
                    10.0,
                    8.0,
                    null,
                    18,
                    2
                ),
                (
                    'Rosis Teleparty - Girls Power',
            'Rosis Music Television Sunday bringt die besten Musikvideos und größten Hits zurück auf die Leinwand.

            Diesmal im Spotlight, die Girls der Pop & Rockmusik umrandet von weiteren großartigen Musikvideos weiterer Künstler

            EINTRITT FREI',
                    '2019-11-07T23:00:00.000Z',
                    3,
                    'images/eventRosis.jpg',
                    3,
                    20.0,
                    null,
                    null,
                    16,
                    1
                ),
            (
                    'Highway to Hell - Halloween 2019',
            '☠ HIGHWAY TO HELL ☠
            Traditionell am 30.10. erwarten wir Euch wieder zu unserer spektakulären Halloween Party Part II  :
            🎃 SPECIAL HALLOWEEN DEKO 🎃 GRUSEL TUNNEL  
            🎃ANIMATION 🎃 MAKE UP MAKER 
            🎃SPECIAL HALLOWEEN DRINK 

            ☠ ☠ ☠ LINE UP & MUSIC - 2 FLOORS ☠ ☠ ☠ 
            Hip Hop, Charts, 90s, Electro,  Party Hits, Latin
            #Louis_FOX . Red A . DJ T-vine
                            🚨🚨EINTRITT🚨🚨 
            Eintritt frei bis 00:00 Uhr, danach mit Kostüm 3€ ohne 5€',
                    '2019-11-07T23:00:00.000Z',
                    1,
                    'images/eventLobo.jpg',
                    1,
                    5.0,
                    3.0,
                    'Eintritt frei bis 00:00',
                    18,
                    3
                ),
                (
                    'ROUTINE×Shape',
                    'Wer dieser Tage in Form kommen will, muss Format haben. Doch der umgebende Raum ist es, in den es sich auszudehnen lohnt, so er es zulässt - und umso mehr, wenn nicht. In vollem Umfang den Rahmen zu sprengen bedeutet, das Ganze vom Rand her zu denken. Was zunächst wie der Umriss einer Hülle erscheint, entpuppt sich bei genauerer Betrachtung als das Wesen der Gestalt. Und wo schließlich alles aus dem Leim geht, wird die Dimension, wird das ganze Ausmaß der seelischen Katastrophe sichtbar. So erst bekommt die Sache Kontur. Routinen können hier helfen.',
                    '2019-11-07T23:00:00.000Z',
                    2,
                    'images/eventOka.jpg',
                    2,
                    10.0,
                    8.0,
                    null,
                    18,
                    2
                ),
                (
                    'Rosis Teleparty - Girls Power',
            'Rosis Music Television Sunday bringt die besten Musikvideos und größten Hits zurück auf die Leinwand.

            Diesmal im Spotlight, die Girls der Pop & Rockmusik umrandet von weiteren großartigen Musikvideos weiterer Künstler

            EINTRITT FREI',
                    '2019-11-07T23:00:00.000Z',
                    3,
                    'images/eventRosis.jpg',
                    3,
                    20.0,
                    null,
                    null,
                    16,
                    1
                ),
            (
                    'Highway to Hell - Halloween 2019',
            '☠ HIGHWAY TO HELL ☠
            Traditionell am 30.10. erwarten wir Euch wieder zu unserer spektakulären Halloween Party Part II  :
            🎃 SPECIAL HALLOWEEN DEKO 🎃 GRUSEL TUNNEL  
            🎃ANIMATION 🎃 MAKE UP MAKER 
            🎃SPECIAL HALLOWEEN DRINK 

            ☠ ☠ ☠ LINE UP & MUSIC - 2 FLOORS ☠ ☠ ☠ 
            Hip Hop, Charts, 90s, Electro,  Party Hits, Latin
            #Louis_FOX . Red A . DJ T-vine
                            🚨🚨EINTRITT🚨🚨 
            Eintritt frei bis 00:00 Uhr, danach mit Kostüm 3€ ohne 5€',
                    '2019-11-07T23:00:00.000Z',
                    1,
                    'images/eventLobo.jpg',
                    1,
                    5.0,
                    3.0,
                    'Eintritt frei bis 00:00',
                    18,
                    3
                ),
                (
                    'ROUTINE×Shape',
                    'Wer dieser Tage in Form kommen will, muss Format haben. Doch der umgebende Raum ist es, in den es sich auszudehnen lohnt, so er es zulässt - und umso mehr, wenn nicht. In vollem Umfang den Rahmen zu sprengen bedeutet, das Ganze vom Rand her zu denken. Was zunächst wie der Umriss einer Hülle erscheint, entpuppt sich bei genauerer Betrachtung als das Wesen der Gestalt. Und wo schließlich alles aus dem Leim geht, wird die Dimension, wird das ganze Ausmaß der seelischen Katastrophe sichtbar. So erst bekommt die Sache Kontur. Routinen können hier helfen.',
                    '2019-11-07T23:00:00.000Z',
                    2,
                    'images/eventOka.jpg',
                    2,
                    10.0,
                    8.0,
                    null,
                    18,
                    2
                ),
                (
                    'Rosis Teleparty - Girls Power',
            'Rosis Music Television Sunday bringt die besten Musikvideos und größten Hits zurück auf die Leinwand.

            Diesmal im Spotlight, die Girls der Pop & Rockmusik umrandet von weiteren großartigen Musikvideos weiterer Künstler

            EINTRITT FREI',
                    '2019-11-07T23:00:00.000Z',
                    3,
                    'images/eventRosis.jpg',
                    3,
                    20.0,
                    null,
                    null,
                    16,
                    1
                )
        `)
        await db.run(`
            INSERT INTO genre (name) VALUES
                ('Hip-Hop'),
                ('Deutsch-Rap'),
                ('House'),
                ('Elektro'),
                ('Minimal'),
                ('Indie'),
                ('Rock'),
                ('Gospel')
        `)
        return await db.run(`
            INSERT INTO eventGenre (eventId, genreId) VALUES
                (1, 3),
                (1, 2),
                (1, 1),
                (2, 3),
                (2, 4),
                (3, 1)
        `)
    }
}