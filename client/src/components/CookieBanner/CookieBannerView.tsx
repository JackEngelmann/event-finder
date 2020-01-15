import './CookieBanner.scss'
import React, { ComponentProps } from 'react'
import { Button } from '../Button/Button'

const cn = 'cookie-banner'

type Props = {
  links: ComponentProps<'a'>[]
  canUseGoogleAnalytics: boolean
  setCanUseGoogleAnalytics: (value: boolean) => void
  texts: {
    allCookies: string
    selectedCookies: string
    cookieInformation: string
    neededCookies: string
  }
  onAcceptAll: () => void
  onAcceptSelected: () => void
}

export const CookieBannerView = (props: Props) => (
  <div className={cn}>
    <div className={`${cn}__content`}>
      <div className={`${cn}__text-and-selection`}>
        {props.texts.cookieInformation}
        <label>
          {props.texts.neededCookies}
          <input type="checkbox" disabled checked />
        </label>
        <label>
          Google Analytics
          <input
            type="checkbox"
            checked={props.canUseGoogleAnalytics}
            onChange={e => props.setCanUseGoogleAnalytics(e.target.checked)}
          />
        </label>
      </div>
      <div className={`${cn}__buttons`}>
        <Button onClick={props.onAcceptAll} primary>
          {props.texts.allCookies}
        </Button>
        <Button onClick={props.onAcceptSelected} secondary>
          {props.texts.selectedCookies}
        </Button>
      </div>
    </div>
    <div className={`${cn}__links`}>
      {props.links.map(l => (
        <a {...l} />
      ))}
    </div>
  </div>
)
