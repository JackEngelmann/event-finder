import React, { useCallback } from 'react'
import { MobileMenu } from './MobileMenu'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxState, ReduxAction } from '../../redux/store'
import { MobileMenuItem } from './MobileMenuItem/MobileMenuItem'
import { useTranslation } from 'react-i18next'

export function MobileMenuContainer() {
    const showMobileMenu = useSelector<ReduxState, any>(
        state => state.showMobileMenu
    )
    const dispatch = useDispatch<(action: ReduxAction) => void>()
    const toggleMobileMenu = useCallback(
        () => dispatch({ type: 'toggleMobilemMenu' }),
        [dispatch]
    )
    const { t } = useTranslation()
    if (!showMobileMenu) return null
    return (
        <MobileMenu>
            <MobileMenuItem to="/event" onClick={toggleMobileMenu}>
                {t('events')}
            </MobileMenuItem>
            <MobileMenuItem to="/club" onClick={toggleMobileMenu}>
                {t('clubs')}
            </MobileMenuItem>
            <MobileMenuItem to="/impressum" onClick={toggleMobileMenu}>
                {t('impressum')}
            </MobileMenuItem>
            <MobileMenuItem to="/data-policy" onClick={toggleMobileMenu}>
                {t('dataPolicy')}
            </MobileMenuItem>
            <MobileMenuItem to="/contact" onClick={toggleMobileMenu}>
                {t('contact')}
            </MobileMenuItem>
            <MobileMenuItem to="/admin" onClick={toggleMobileMenu}>
                {t('administration')}
            </MobileMenuItem>
        </MobileMenu>
    )
}
