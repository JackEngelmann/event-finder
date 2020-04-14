import './MobileHeader.scss'
import React, { ReactNode } from 'react'
import { Icon } from '../../Icon/Icon'
import { Logo } from '../../Logo/Logo'

type Props = {
  children?: ReactNode
  toggleMobileMenu: () => void
  toggleCalender: () => void
  onLogoClick: () => void
}

const cn = 'mobile-header'

export function HeaderView(props: Props) {
  const { children, toggleMobileMenu, toggleCalender, onLogoClick } = props
  return (
    <div className={cn}>
      <div className={`${cn}__header`}>
        <div className={`${cn}__left`} onClick={onLogoClick}>
          <Logo />
        </div>
        <div className={`${cn}__content`}>
          <button
            className={`${cn}__calendar-button`}
            onClick={toggleCalender}
            aria-label="event calendar"
          >
            <Icon icon="calendar" />
          </button>
        </div>
        <div className={`${cn}__right`} />
      </div>
      <div className={`${cn}__sub-header`}>
        <div className={`${cn}__left`} onClick={toggleMobileMenu}>
          <Icon icon="bars" className={`${cn}__menu-icon`} />
        </div>
        <div className={`${cn}__content`}>{children}</div>
        <div className={`${cn}__right`} />
      </div>
    </div>
  )
}
