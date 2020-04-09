import React from 'react'
import classNames from 'classnames'
import { Moment } from 'moment'
import './CalendarDay.scss'

type Props = {
  day: Moment
  isInMonth: boolean
  isSelected: boolean
  onClick: () => void
}

const cn = 'calendar-day'

export function CalendarDayView(props: Props) {
  const { day, onClick, isSelected, isInMonth } = props
  const isWeekend = [0, 6].includes(day.day())
  return (
    <div
      className={classNames(cn, {
        [`${cn}--weekend`]: isWeekend,
        [`${cn}--selected`]: isSelected,
      })}
      onClick={onClick}
      data-cy={`calendar-day-${day.date()}`}
    >
      {isInMonth && day.date()}
    </div>
  )
}
