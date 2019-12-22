import React from 'react'
import { NetworkErrorView } from './NetworkErrorView'
import { useTranslation } from 'react-i18next'

export function NetworkErrorContainer() {
  const { t } = useTranslation()
  return (
    <NetworkErrorView
      texts={{
        networkErrorOccured: t('networkErrorOccured'),
        networkErrorHint: t('networkErrorHint'),
      }}
    />
  )
}
