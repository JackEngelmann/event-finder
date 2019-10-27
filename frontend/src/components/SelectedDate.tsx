import React from 'react'
import { Moment } from 'moment';
import './SelectedDate.css'

type Props = {
    toggleCalendar(): void
    date: Moment
}

export function SelectedDate(props: Props) {
    const { toggleCalendar, date } = props;
    return (
      <div
        onClick={toggleCalendar}
        className="selected-date"
      >
        {date.format('D. MMMM')}
      </div>
    )
}