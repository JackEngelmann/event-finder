import React, { ReactNode, useCallback } from 'react'
import { Header } from '../components/Header'
import { useDispatch } from 'react-redux'
import { ReduxAction } from '../redux/store'
import { useHistory } from 'react-router'

type Props = {
    children?: ReactNode
    left?: ReactNode
    right?: ReactNode
}
export function HeaderContainer(props: Props) {
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
        <Header
            {...props}
            onLogoClick={() => history.push('/')}
            toggleMobileMenu={toggleMobileMenu}
            toggleCalender={toggleMobileCalendar}
        />
    )
}
