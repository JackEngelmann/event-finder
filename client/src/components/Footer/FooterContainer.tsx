import React from 'react'
import { Footer } from './Footer'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { CountryFlagGermany } from '../CountryFlags/CountryFlagGermany'
import { CountryFlagGreatBritain } from '../CountryFlags/CountryFlagGreatBrittain'

export function FooterContainer() {
  const history = useHistory()
  const { t } = useTranslation()
  const language = i18next.language.split('-')[0]
  function changeLanguage(language: string) {
    i18next.changeLanguage(language)
  }
  return (
    <Footer>
      <button onClick={() => history.push('/impressum')}>
        {t('impressum')}
      </button>
      <button onClick={() => history.push('/data-policy')}>
        {t('dataPolicy')}
      </button>
      <button onClick={() => history.push('/contact')}>{t('contact')}</button>
      <button
        onClick={() =>
          language === 'de' ? changeLanguage('en') : changeLanguage('de')
        }
        data-cy="language-toggle"
      >
        {language === 'en' && (
          <CountryFlagGermany
            style={{
              width: '1.6em',
              height: '1.2em',
            }}
          />
        )}
        {language === 'de' && (
          <CountryFlagGreatBritain
            style={{
              width: '1.6em',
              height: '1.2em',
            }}
          />
        )}
      </button>
    </Footer>
  )
}
