import { Calendar } from '../components/Calendar'
import { useSelectedDate } from './useSelectedDate'
import moment from 'moment'
import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxState, ReduxAction } from '../redux/store'
import './MobileCalendar.scss'

const currentDate = moment()

const cn = 'mobile-calendar'

export function MobileCalendar() {
    const [selectedDate, setSelectedDate] = useSelectedDate()
    const [monthSelection, setMonthSelection] = useState(currentDate)
    const showMobileCalendar = useSelector<ReduxState, any>(state => state.showMobileCalendar)
    const dispatch = useDispatch<(action: ReduxAction) => void>()
    const hideMobileCalendar = useCallback(() => dispatch({ type: 'hideMobileCalendar'}), [dispatch])
    if (!showMobileCalendar) return null;
    return (
        <div className={cn}>
            <Calendar
                monthSelection={monthSelection}
                setMonthSelection={setMonthSelection}
                selectedDate={selectedDate}
                setSelectedDate={date => {
                    setSelectedDate(date)
                    hideMobileCalendar()
                }}
            />
        </div>
    )
}
