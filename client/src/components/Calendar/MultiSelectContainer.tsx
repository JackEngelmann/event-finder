import moment, { Moment } from 'moment'
import { useTranslation } from 'react-i18next'
import { getWeeksInMonth } from './getWeeksInMonth'
import { CalendarView } from './CalendarView'
import { CalendarDayView } from './CalendarDay/CalendarDayView'
import React from 'react'

type Props = {
  monthSelection: Moment
  selectedDates: Moment[]
  setSelectedDates(selectedDates: Moment[]): void
  setMonthSelection(monthSelection: Moment): void
}

export function MultiSelectCalendarContainer(props: Props) {
  const {
    setSelectedDates,
    selectedDates,
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
      renderDay={day => {
        const isSelected = selectedDates.some(d => d.isSame(day, 'day'))
        return (
          <CalendarDayView
            day={day}
            onClick={() => {
              setSelectedDates(
                isSelected
                  ? selectedDates.filter(d => !d.isSame(day, 'day'))
                  : [...selectedDates, day]
              )
            }}
            isInMonth={day.isSame(monthSelection, 'month')}
            isSelected={isSelected}
          />
        )
      }}
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
