import './EditButton.scss'
import React, { ComponentProps } from 'react'
import { Button } from '../../../components/Button/Button'
import { Icon } from '../../../components/Icon/Icon'

type Props = ComponentProps<typeof Button>

const cn = 'edit-button'

export const EditButtonView = (props: Props) => (
  <Button className={cn} data-cy="eventdetailpage-edit-button" {...props}>
    <Icon icon="pen" />
  </Button>
)
