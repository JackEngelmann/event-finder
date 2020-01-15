import React, { useState } from 'react'
import { CookieBannerView } from './CookieBannerView'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { startGoogleAnalytics } from '../../googleAnalytics'

export function CookieBannerContainer() {
  const [isHidden, setIsHidden] = useState(false)
  const history = useHistory()
  const { t } = useTranslation()
  const [canUseGoogleAnalytics, setCanUseGoogleAnalytics] = useState(false)

  if (isHidden) return null

  const links = [
    {
      children: t('impressum'),
      onClick: () => history.push('/impressum'),
    },
    {
      children: t('dataPolicy'),
      onClick: () => history.push('/data-policy'),
    },
  ]

  function save(canUseGoogleAnalytics: boolean) {
    if (canUseGoogleAnalytics) startGoogleAnalytics()
    setIsHidden(true)
  }

  return (
    <CookieBannerView
      onAcceptAll={() => save(true)}
      onAcceptSelected={() => save(canUseGoogleAnalytics)}
      canUseGoogleAnalytics={canUseGoogleAnalytics}
      setCanUseGoogleAnalytics={setCanUseGoogleAnalytics}
      links={links}
      texts={{
        neededCookies: t('neededCookies'),
        cookieInformation: t('cookieInformation'),
        allCookies: t('allCookies'),
        selectedCookies: t('selectedCookies'),
      }}
    />
  )
}
