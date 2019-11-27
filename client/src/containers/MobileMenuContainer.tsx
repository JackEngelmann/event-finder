import React, { useCallback } from 'react'
import { MobileMenu } from '../components/MobileMenu'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxState, ReduxAction } from '../redux/store'
import { MobileMenuItem } from '../components/MobileMenuItem'

export function MobileMenuContainer() {
    const showMobileMenu = useSelector<ReduxState, any>(
        state => state.showMobileMenu
    )
    const dispatch = useDispatch<(action: ReduxAction) => void>()
    const toggleMobileMenu = useCallback(
        () => dispatch({ type: 'toggleMobilemMenu' }),
        [dispatch]
    )
    if (!showMobileMenu) return null
    return (
        <MobileMenu>
            <MobileMenuItem to="/event" onClick={toggleMobileMenu}>
                Events
            </MobileMenuItem>
            <MobileMenuItem to="/club" onClick={toggleMobileMenu}>
                Clubs
            </MobileMenuItem>
            <MobileMenuItem to="/impressum" onClick={toggleMobileMenu}>
                Impressum
            </MobileMenuItem>
            <MobileMenuItem to="/data-policy" onClick={toggleMobileMenu}>
                Data Policy
            </MobileMenuItem>
            <MobileMenuItem to="/contact" onClick={toggleMobileMenu}>
                Contact
            </MobileMenuItem>
            <MobileMenuItem to="/admin" onClick={toggleMobileMenu}>
                Administration
            </MobileMenuItem>
        </MobileMenu>
    )
}
