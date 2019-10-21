import React, { useState } from 'react';
import './App.css';
import { Calendar } from './calendar/Calendar'
import { useEvents, Event } from './api';
import moment, { Moment } from 'moment';
import { EventList } from './EventList';
import { SelectedDate } from './SelectedDate';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>()
  const events = useEvents();
  const onSameDay = (event: Event) => moment(event.date).isSame(selectedDate, 'day')
  const filteredEvents = (events || []).filter(onSameDay)
  const [displayCalendar, setDisplayCalendar] = useState(true)

  function renderCalendar() {
    return (
      <div className="app__calendar-wrapper">
        <Calendar
          year={2019}
          month={0}
          selectedDate={selectedDate}
          setSelectedDate={date => {
            setSelectedDate(date)
            setDisplayCalendar(false)
          }}
        />
      </div>
    )
  }

  function renderSelectedDate() {
    if (!selectedDate) return null
    return (
      <div className="app__selected-date-wrapper">
        <SelectedDate
          displayCalendar={() => setDisplayCalendar(true)}
          date={selectedDate}
        />
      </div>
    )
  }

  function renderEventList() {
    return (
      <div className="app__event-list-wrapper">
        <EventList
          events={filteredEvents}
        />
      </div>
    )
  }

  return (
    <div className="app">
      {(!displayCalendar && selectedDate)
        ? renderSelectedDate()
        : renderCalendar()
      }
      {renderEventList()}
    </div>
  );
}

export default App;
