import './DesktopHeader.scss'
import logo from '../../../assets/logoSquare.jpg'
import React from 'react'
import { Spacer } from '../../Layouting/Spacer'
import { Text } from '../../Layouting/Text'

type Props = {
  onLogoClick: () => void
}

const cn = 'desktop-header'

export function DesktopHeaderView(props: Props) {
  const { onLogoClick } = props
  return (
    <div className={cn}>
      <div className={`${cn}__max-width-container`}>
        <Spacer marginTop={1} marginBottom={1} marginRight={3}>
          <img alt="logo" onClick={onLogoClick} src={logo} />
        </Spacer>
        <Text size={2}>Local Party Dresden</Text>
      </div>
    </div>
  )
}
