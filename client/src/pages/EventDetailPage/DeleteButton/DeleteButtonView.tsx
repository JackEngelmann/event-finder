import './DeleteButton.scss'
import React, { ComponentProps } from 'react'
import { Button } from '../../../components/Button/Button'
import { Icon } from '../../../components/Icon/Icon'

type Props = ComponentProps<typeof Button>

const cn = 'delete-button'

export const DeleteButtonView = (props: Props) => (
  <Button className={cn} {...props}>
    <Icon icon="times" />
  </Button>
)
