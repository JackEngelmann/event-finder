import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import 'moment/locale/de'

import LanguageDetector from 'i18next-browser-languagedetector'
import moment from 'moment'
import { contact } from './contact'

const resources = {
  en: {
    translation: {
      address: 'Address',
      administration: 'Administration',
      admissionFee: 'Admission Fee',
      admissionFeeWithDiscount: 'Admission Fee With Discount',
      allCookies: 'Accept all',
      amountOfFloors: 'Amount of Floors',
      cancel: 'Cancel',
      club: 'Club',
      clubs: 'Clubs',
      contact: 'Contact',
      cookieInformation: 'We use cookies to improve our site.',
      create: 'Create',
      createClub: 'Create Club',
      createEvent: 'Create Event',
      dataPolicy: 'Data Policy',
      date: 'Date',
      description: 'Description',
      editClub: 'Edit Club',
      editEvent: 'Edit Event',
      email: 'Email',
      errorOccured: "An error occured. We're sorry that happend :(",
      events: 'Events',
      genres: 'Genres',
      images: 'Images',
      impressum: 'Impressum',
      link: 'Link',
      linkToClub: 'Club',
      linkToEvent: 'Event',
      listNoClubs: 'No clubs available',
      locale: 'en',
      minimumAge: 'Minimum Age',
      name: 'Name',
      neededCookies: 'Essential',
      networkErrorHint: `Try reloading or contact us (${contact.email}) when the error occurs multiple times.`,
      networkErrorOccured: 'A problem with the network occured :(',
      noEventsToday: 'There are no events today',
      noUpcomingEvents: 'No upcoming events',
      priceCategory: 'Price Category',
      region: 'Region',
      save: 'Save',
      selectedCookies: 'Accept selection',
      showDetails: 'Show details',
      showLess: 'Show Less',
      showMore: 'Show More',
      specials: 'Specials',
      upcomingEvents: 'Upcoming Events',
    },
  },
  de: {
    translation: {
      address: 'Adresse',
      administration: 'Administration',
      admissionFee: 'Eintritt',
      admissionFeeWithDiscount: 'Eintritt ermäßigt',
      allCookies: 'Alle akzeptieren',
      amountOfFloors: 'Anzahl Floors',
      cancel: 'Abbrechen',
      club: 'Club',
      clubs: 'Clubs',
      contact: 'Kontakt',
      cookieInformation: 'Wir nutzen Cookies um unsere Seite zu verbessern.',
      create: 'Erstellen',
      createClub: 'Club erstellen',
      createEvent: 'Event erstellen',
      dataPolicy: 'Datenschutz',
      date: 'Datum',
      description: 'Beschreibung',
      editClub: 'Club bearbeiten',
      editEvent: 'Event bearbeiten',
      email: 'Email',
      errorOccured: 'Ein Fehler ist aufgetreten. Tut uns leid :(',
      events: 'Events',
      genres: 'Genres',
      images: 'Bilder',
      impressum: 'Impressum',
      link: 'Link',
      linkToClub: 'Club',
      linkToEvent: 'Event',
      listNoClubs: 'Keine Clubs verfügbar',
      locale: 'de',
      minimumAge: 'Mindestalter',
      name: 'Name',
      neededCookies: 'Technisch notwendige',
      networkErrorHint: `Versuche neuzuladen oder kontaktiere uns (${contact.email}) wenn der Fehler mehrfach auftritt.`,
      networkErrorOccured:
        'Ein Netzwerk-Fehler ist aufgetrete. Tut uns leid :(',
      noEventsToday: 'Heute finden keine Events statt',
      noUpcomingEvents: 'Keine bevorstehenden Events',
      priceCategory: 'Preis-Kategorie',
      region: 'Region',
      save: 'Speichern',
      selectedCookies: 'Auswahl akzeptieren',
      showDetails: 'Details anzeigen',
      showLess: 'Weniger anzeigen',
      showMore: 'Mehr anzeigen',
      specials: 'Angebote',
      upcomingEvents: 'Bevorstehende Events',
    },
  },
}

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

i18n.on('languageChanged', lng => {
  const isGerman = lng.startsWith('de')
  moment.locale(isGerman ? 'de' : 'en')
})

export default i18n
