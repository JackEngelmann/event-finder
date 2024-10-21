import React, { ReactNode } from 'react'
import * as R from 'ramda'
import moment from 'moment'
import './Calendar.scss'

type Props = {
  currentMonth: string
  nextMonth: () => void
  previousMonth: () => void
  renderDay: (day: moment.Moment) => ReactNode
  weeksInMonth: moment.Moment[][]
}

const cn = 'calendar'

export function CalendarView(props: Props) {
  const {
    weeksInMonth,
    renderDay,
    currentMonth,
    previousMonth,
    nextMonth,
  } = props

  function renderHeader() {
    return (
      <div className={`${cn}__header`}>
        <div className={`${cn}__month-switcher`} onClick={previousMonth}>
          ←
        </div>
        <div>{currentMonth}</div>
        <div className={`${cn}__month-switcher`} onClick={nextMonth}>
          →
        </div>
      </div>
    )
  }

  function renderWeekdayHeader() {
    const renderWeekDay = (weekday: number) => (
      <div className={`${cn}__weekday`} key={weekday}>
        {moment.weekdaysMin(true)[weekday]}
      </div>
    )
    return (
      <div className={`${cn}__week-header`}>{R.times(renderWeekDay, 7)}</div>
    )
  }

  function renderWeek(week: moment.Moment[]) {
    return (
      <div className={`${cn}__week`} key={'week-from-' + week[0].toISOString()}>
        {week.map(renderDay)}
      </div>
    )
  }

  return (
    <div className={`${cn}__wrapper`} data-cy="calendar">
      {renderHeader()}
      {renderWeekdayHeader()}
      {weeksInMonth.map(renderWeek)}
    </div>
  )
}
