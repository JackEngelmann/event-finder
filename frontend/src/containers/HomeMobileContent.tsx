import './HomeMobileContent.scss'
import classNames from 'classnames'
import React, { useState } from 'react';
import moment from "moment"
import { useSelectedDate } from './useSelectedDate';
import { useHistory, useLocation } from 'react-router';
import { SelectedDate } from '../components/SelectedDate';
import { Calendar } from '../components/Calendar';
import { EventListContainer } from './EventListContainer';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { Content } from '../components/Content';

type Props = {
 monthSelection: moment.Moment
 setMonthSelection: (monthSelection: moment.Moment) => void 
}

const PickDate = () => <span>Pick a date</span>

const cn = 'home-mobile-content'

export function HomeMobileContent(props: Props) {
  const { monthSelection, setMonthSelection } = props
  const [selectedDate, setSelectedDate] = useSelectedDate()
  const [displayCalendar, setDisplayCalendar] = useState(!selectedDate)
  const history = useHistory()
  const search = useLocation().search
  const onEventClick = (event: { id: number }) => 
    history.push(`/event/${event.id}${search}`)
  return (
    <Page>
      <Header>
        {selectedDate
          ? <SelectedDate
                date={selectedDate}
                onClick={() => setDisplayCalendar(displayCalendar => !displayCalendar)}
            />
          : <PickDate />
        }
      </Header>
      <Content scrollable>
        <div
          className={classNames(`${cn}__calendar-wrapper`, {
            [`${cn}__calendar-wrapper--hidden`]: !displayCalendar
          })}
        >
          <Calendar
            monthSelection={monthSelection}
            setMonthSelection={setMonthSelection}
            selectedDate={selectedDate}
            setSelectedDate={selectedDate => {
              setSelectedDate(selectedDate)
              setDisplayCalendar(false)
            }}
          />
        </div>
        <div className={`${cn}__event-list-wrapper`}>
          <EventListContainer
            selectedDate={selectedDate}
            onEventClick={onEventClick}
          />
        </div>
      </Content>
    </Page>
  )
}