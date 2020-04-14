import React, { ReactNode, useCallback } from 'react'
import { HeaderView } from './MobileHeaderView'
import { useDispatch } from 'react-redux'
import { ReduxAction } from '../../../redux/store'
import { useHistory } from 'react-router'

type Props = {
  children?: ReactNode
}

export function MobileHeaderContainer(props: Props) {
  const dispatch = useDispatch<(action: ReduxAction) => void>()
  const toggleMobileMenu = useCallback(
    () => dispatch({ type: 'toggleMobilemMenu' }),
    [dispatch]
  )
  const toggleMobileCalendar = useCallback(
    () => dispatch({ type: 'toggleMobileCalendar' }),
    [dispatch]
  )
  const history = useHistory()

  return (
    <HeaderView
      {...props}
      onLogoClick={() => history.push('/')}
      toggleMobileMenu={toggleMobileMenu}
      toggleCalender={toggleMobileCalendar}
    />
  )
}
