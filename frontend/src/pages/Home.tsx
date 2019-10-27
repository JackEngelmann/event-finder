import React, { useState } from 'react'
import moment, { Moment } from 'moment';
import { useEvents, Event, useClubs } from '../api';
import { Calendar } from '../components/Calendar';
import { SelectedDate } from '../components/SelectedDate';
import { EventList } from '../components/EventList';
import classNames from 'classnames'
import './Home.css'
import { useLocation, useHistory } from 'react-router';
import { EventCard } from '../components/EventCard';
import { useDimensions } from '../components/useDimensions';
import { ClubList } from '../components/ClubList';
import { ClubListItem } from '../components/ClubListItem';
import { Footer } from '../components/Footer';

type Props = {}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function queryStringFromSelectedDate(date: Moment) {
  return date.toISOString()
}

function selectedDateFromQueryString(queryString: string | null) {
  if (!queryString) return undefined;
  return moment(queryString)
}

const currentDate = moment()

export function Home(props: Props) {
  const dimensions = useDimensions()
  const showSideBySide = Boolean(dimensions.width && dimensions.width > 800);
  const showClubList = Boolean(dimensions.width && dimensions.width > 1000);
  const events = useEvents()
  const clubs = useClubs()
  const onSameDay = (event: Event) => moment(event.date).isSame(selectedDate, 'day')
  const query = useQuery()
  const [monthSelection, setMonthSelection] = useState(currentDate)
  const selectedDate = selectedDateFromQueryString(query.get('date'))
  const filteredEvents = (events || []).filter(onSameDay)
  const [displayCalendar, setDisplayCalendar] = useState(!selectedDate)
  const history = useHistory()

  function renderCalendar() {
    const hidden = !displayCalendar && !showSideBySide
    return (
      <div
        className={classNames("home__calendar-wrapper", {
          "home__calendar-wrapper--hidden": hidden
        })}
      >
        <Calendar
          monthSelection={monthSelection}
          setMonthSelection={setMonthSelection}
          selectedDate={selectedDate}
          setSelectedDate={date => {
            history.push(`/?date=${queryStringFromSelectedDate(date)}`)
            setDisplayCalendar(false)
          }}
        />
      </div>
    )
  }

  function renderSelectedDate() {
    return (
        selectedDate ? (
          <SelectedDate
            toggleCalendar={() => setDisplayCalendar(displayCalendar => !displayCalendar)}
            date={selectedDate}
          />
        ) : 'Pick a date'
    )
  }

  function renderEventList() {
    return (
      <div className="home__event-list-wrapper">
        <EventList
          events={filteredEvents}
          renderEvent={event => (
            <EventCard
              desktop={showSideBySide}
              key={event.id}
              event={event}
              onClick={() => history.push(`/${event.id}?date=${queryStringFromSelectedDate(selectedDate!)}`)}
            />
          )}
        />
      </div>
    )
  }

  function renderClubList() {
    return (
      <div className="home__club-list-wrapper">
        <ClubList
          clubs={clubs}
          renderClub={club => <ClubListItem key={club.name} club={club} />}
          showFirst={15}
        />
      </div>
    )
  }

  return (
    <div className="home">
      {showSideBySide ? (
        <>
          <div className="home__header">
            {renderSelectedDate()}
          </div>
          <div className={classNames("home__content", 'home__content--side-by-side')}>
            {showClubList && renderClubList()}
            {renderEventList()}
            {renderCalendar()}
          </div>
        </>
      ) : (
        <>
          <div className="home__header">
            {renderSelectedDate()}
          </div>
          <div className={"home__content"}>
            {renderCalendar()}
            {renderEventList()}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}