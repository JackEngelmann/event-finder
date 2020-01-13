import React from 'react'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'
import moment from 'moment'
import './DayQuickSwitch.scss'

type Props = {
  selectedDate: moment.Moment
  setSelectedDate(selectedDate: moment.Moment): void
}

const cn = 'day-quick-switch'

export function DayQuickSwitchView(props: Props) {
  const { selectedDate, setSelectedDate } = props
  return (
    <div data-cy="day-quick-switch">
      <Button
        borderless
        onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))}
        className={`${cn}__select-day-arrow-button`}
      >
        <Icon icon="arrow-left" />
      </Button>
      <span>{selectedDate.format('D. MMMM')}</span>
      <Button
        borderless
        onClick={() => setSelectedDate(selectedDate.add(1, 'day'))}
        className={`${cn}__select-day-arrow-button`}
      >
        <Icon icon="arrow-right" />
      </Button>
    </div>
  )
}
