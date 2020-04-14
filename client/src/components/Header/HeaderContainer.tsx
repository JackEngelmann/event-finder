import React, { ReactNode } from 'react'
import { useDimensions } from '../utils/useDimensions'
import { MobileHeader } from './MobileHeader'
import { DesktopHeader } from './DesktopHeader'

type Props = {
  children?: ReactNode
}

export function HeaderContainer(props: Props) {
  const dimensions = useDimensions()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)

  return desktop ? <DesktopHeader /> : <MobileHeader {...props} />
}
