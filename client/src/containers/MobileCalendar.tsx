import { Calendar } from '../components/Calendar'
import { useSelectedDate, queryStringFromSelectedDate } from './useSelectedDate'
import moment from 'moment'
import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxState, ReduxAction } from '../redux/store'
import './MobileCalendar.scss'
import { useHistory } from 'react-router'

const currentDate = moment()

const cn = 'mobile-calendar'

export function MobileCalendar() {
    const [selectedDate] = useSelectedDate()
    const [monthSelection, setMonthSelection] = useState(currentDate)
    const showMobileCalendar = useSelector<ReduxState, any>(
        state => state.showMobileCalendar
    )
    const dispatch = useDispatch<(action: ReduxAction) => void>()
    const hideMobileCalendar = useCallback(
        () => dispatch({ type: 'hideMobileCalendar' }),
        [dispatch]
    )
    const history = useHistory()
    if (!showMobileCalendar) return null
    return (
        <div className={cn}>
            <Calendar
                monthSelection={monthSelection}
                setMonthSelection={setMonthSelection}
                selectedDate={selectedDate}
                setSelectedDate={date => {
                    history.push(
                        `/event?date=${queryStringFromSelectedDate(date)}`
                    )
                    hideMobileCalendar()
                }}
            />
        </div>
    )
}
