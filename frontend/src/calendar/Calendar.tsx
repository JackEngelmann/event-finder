import * as R from 'ramda'
import moment, { Moment, weekdaysMin } from 'moment'
import React from 'react'
import './Calendar.css'
import classNames from 'classnames'

type Props = {
    year: number
    month: number
    selectedDate: Moment | undefined
    setSelectedDate(selectedDate: Moment): void
}

export function Calendar(props: Props) {
    const { setSelectedDate, selectedDate } = props;
    const weeksInMonth = getWeeksInMonth(props.year, props.month)

    function renderWeek(week: Moment[]) {
        return (
            <div className="calendar__week">
                {week.map(renderDay)}
            </div>
        )
    }

    function renderDay(day: Moment) {
        const isInMonth = day.month() === props.month
        const isWeekend = [0, 6].includes(day.weekday())
        const isSelected = selectedDate && selectedDate.isSame(day, 'day')
        return (
            <div
                className={classNames('calendar__date', {
                    'calendar__date--weekend': isWeekend,
                    'calendar__date--selected': isSelected
                })}
                onClick={() => setSelectedDate(day)}
            >
                {isInMonth && day.date()}
            </div>
        )
    }

    function renderWeekdayHeader() {
        const renderWeekDay = (weekday: number) => <div className="calendar__weekday">{weekdaysMin()[weekday]}</div>
        return (
            <div className="calendar__week">
                {R.times(renderWeekDay, 7)}
            </div>
        )
    }

    return <div className="calendar__wrapper">
        {renderWeekdayHeader()}
        {weeksInMonth.map(renderWeek)}
    </div>
}

function getWeeksInMonth(year: number, month: number) {
    const firstDayOfFirstWeek = moment().year(year).month(month).startOf('month').startOf('week');
    const daysInWeeks: Moment[][] = []
    let day: Moment = moment(firstDayOfFirstWeek)
    const lastDayOfLastWeek = moment().year(year).month(month).endOf('month').endOf('week')
    while (true) {
        const isMonday = day.weekday() === 0
        if (day.isAfter(lastDayOfLastWeek)) break
        if (isMonday) {
            daysInWeeks.push([day])
        } else {
            const lastWeek = daysInWeeks[daysInWeeks.length - 1];
            lastWeek.push(day)
        }
        day = moment(day).add(1, 'day')
    }
    return daysInWeeks
}