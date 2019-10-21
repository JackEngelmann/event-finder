import React from 'react'
import { Moment } from 'moment';
import './SelectedDate.css'

type Props = {
    displayCalendar(): void
    date: Moment
}

export function SelectedDate(props: Props) {
    const { displayCalendar, date } = props;
    return (
      <div
        onClick={displayCalendar}
        className="selected-date"
      >
        {date.format('D. MMMM')}
      </div>
    )
}