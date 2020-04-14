import React from 'react'
import { DesktopHeaderView } from './DesktopHeaderView'
import { useHistory } from 'react-router-dom'

export function DesktopHeaderContainer() {
  const history = useHistory()
  return <DesktopHeaderView onLogoClick={() => history.push('/')} />
}
