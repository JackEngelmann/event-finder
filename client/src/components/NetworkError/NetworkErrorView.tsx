import * as React from 'react'
import './NetworkError.scss'

type Props = {
  texts: {
    networkErrorOccured: string
    networkErrorHint: string
  }
}

const cn = 'network-error'

export function NetworkErrorView(props: Props) {
  const { texts } = props
  return (
    <div className={cn}>
      {texts.networkErrorOccured}
      <br />
      {texts.networkErrorHint}
    </div>
  )
}
