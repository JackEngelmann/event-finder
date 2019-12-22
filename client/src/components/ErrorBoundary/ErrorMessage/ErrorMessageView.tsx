import React from 'react'
import { Button } from '../../Button/Button';

const cn = 'error-message';

type Props = {
  showDetails: () => void
  isShowDetails: boolean
  error: string
  texts: {
    errorOccured: string
    showDetails: string
  }
}

export function ErrorMessageView(props: Props) {
  const { showDetails, texts, isShowDetails, error } = props
  return (
      <div className={cn}>
        {texts.errorOccured}
        <br />
        <Button onClick={showDetails}>
          {texts.showDetails}
        </Button>
        {isShowDetails && (
          <div>
            {error}
          </div>
        )}
      </div>
  )
}