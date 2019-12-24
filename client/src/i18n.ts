import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'moment/locale/de'

import LanguageDetector from 'i18next-browser-languagedetector';
import moment, { weekdays } from 'moment';
import { contact } from './contact';

const resources = {
  en: {
    translation: {
      administration: 'Administration',
      admissionFee: 'Admission Fee',
      admissionFeeWithDiscount: 'Admission Fee With Discount',
      adress: 'Adress',
      amountOfFloors: 'Amount of Floors',
      cancel: 'Cancel',
      club: 'Club',
      clubs: 'Clubs',
      contact: 'Contact',
      create: 'Create',
      createClub: 'Create Club',
      createEvent: 'Create Event',
      dataPolicy: 'Data Policy',
      date: 'Date',
      description: 'Description',
      editClub: 'Edit Club',
      editEvent: 'Edit Event',
      email: 'Email',
      errorOccured: 'An error occured. We\'re sorry that happend :(',
      events: 'Events',
      genres: 'Genres',
      images: 'Images',
      impressum: 'Impressum',
      link: 'Link',
      linkToEvent: 'Event',
      listNoClubs: 'No clubs available',
      minimumAge: 'Minimum Age',
      name: 'Name',
      networkErrorHint: `Try reloading or contact us (${contact.email}) when the error occurs multiple times.`,
      networkErrorOccured: 'A problem with the network occured :(',
      noEventsToday: 'There are no events today',
      priceCategory: 'Price Category',
      region: 'Region',
      save: 'Save',
      showDetails: 'Show details',
      showLess: 'Show Less',
      showMore: 'Show More',
      specials: 'Specials',
    }
  },
  de: {
    translation: {
      administration: 'Administration',
      admissionFee: 'Eintritt',
      admissionFeeWithDiscount: 'Eintritt ermäßigt',
      adress: 'Addresse',
      amountOfFloors: 'Anzahl Floors',
      cancel: 'Abbrechen',
      club: 'Club',
      clubs: 'Clubs',
      contact: 'Kontakt',
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
      linkToEvent: 'Event',
      listNoClubs: 'Keine Clubs verfügbar',
      minimumAge: 'Mindestalter',
      name: 'Name',
      networkErrorHint: `Versuche neuzuladen oder kontaktiere uns (${contact.email}) wenn der Fehler mehrfach auftritt.`,
      networkErrorOccured: 'Ein Netzwerk-Fehler ist aufgetrete. Tut uns leid :(',
      noEventsToday: 'Heute finden keine Events statt',
      priceCategory: 'Preis-Kategorie',
      region: 'Region',
      save: 'Speichern',
      showDetails: 'Details anzeigen',
      showLess: 'Weniger anzeigen',
      showMore: 'Mehr anzeigen',
      specials: 'Angebote',
    }
  }
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
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })

i18n.on('languageChanged', lng => {
  const isGerman = lng.startsWith('de')
  moment.locale(isGerman ? 'de' : 'en')
})


export default i18n;