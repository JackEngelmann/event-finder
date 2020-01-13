import moment, { Moment } from 'moment'
import { useTranslation } from 'react-i18next'
import { getWeeksInMonth } from './getWeeksInMonth'
import { CalendarView } from './CalendarView'
import React from 'react'
import { CalendarDayView } from './CalendarDay/CalendarDayView'

type Props = {
  monthSelection: Moment
  selectedDate: Moment | undefined
  setSelectedDate(selectedDate: Moment): void
  setMonthSelection(monthSelection: Moment): void
}

export function CalendarContainer(props: Props) {
  const {
    setSelectedDate,
    selectedDate,
    monthSelection,
    setMonthSelection,
  } = props

  // rerenders component when locale changes -> has influence on moment.js
  useTranslation()

  const weeksInMonth = getWeeksInMonth(
    monthSelection.year(),
    monthSelection.month()
  )

  return (
    <CalendarView
      weeksInMonth={weeksInMonth}
      renderDay={day => (
        <CalendarDayView
          day={day}
          onClick={() => setSelectedDate(day)}
          isInMonth={day.isSame(monthSelection, 'month')}
          isSelected={selectedDate ? selectedDate.isSame(day, 'day') : false}
        />
      )}
      previousMonth={() =>
        setMonthSelection(moment(monthSelection).subtract(1, 'month'))
      }
      currentMonth={monthSelection.format('MMMM YYYY')}
      nextMonth={() =>
        setMonthSelection(moment(monthSelection).add(1, 'month'))
      }
    />
  )
}
