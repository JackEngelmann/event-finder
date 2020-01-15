import React, { useState } from 'react'
import { CookieBannerView } from './CookieBannerView'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
    if (canUseGoogleAnalytics) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = "https://www.googletagmanager.com/gtag/js?id=UA-154432488-1"
      const headElement = document.getElementsByTagName('head')[0]
      headElement.appendChild(script)

      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag(){
        // @ts-ignore
        dataLayer.push(arguments);
      }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', 'UA-154432488-1', { 'anonymize_ip': true });
    }
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
