import React, { useState } from 'react'
import { ErrorMessageView } from './ErrorMessageView'
import { useTranslation } from 'react-i18next'

type Props = { error: string }

export function ErrorMessageContainer(props: Props) {
  const { error } = props
  const [isShowDetails, setIsShowDetails] = useState(false)
  const { t } = useTranslation()
  return (
    <ErrorMessageView
      showDetails={() => setIsShowDetails(true)}
      isShowDetails={isShowDetails}
      texts={{
        errorOccured: t('errorOccured'),
        showDetails: t('showDetails'),
      }}
      error={error}
    />
  )
}
