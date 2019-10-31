import React, { useState } from 'react'
import moment, { Moment } from 'moment';
import { Event, Club } from '../types';
import { Calendar } from '../components/Calendar';
import { SelectedDate } from '../components/SelectedDate';
import { EventList } from '../components/EventList';
import classNames from 'classnames'
import './HomePage.css'
import { useLocation, useHistory } from 'react-router';
import { EventCard } from '../components/EventCard';
import { useDimensions } from '../components/useDimensions';
import { ClubList } from '../components/ClubList';
import { ClubListItem } from '../components/ClubListItem';
import { Footer } from '../components/Footer';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

type Props = {}

function useUrlSearchParams() {
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

const QUERY = gql`
{
  events {
    id
    name
    date
    imageUrl
    club {
      id
      name
    }
  }
  clubs {
    id
    name
  }
}
`
type QueryData = {
  events: Pick<Event, 'id' | 'name' | 'date' | 'imageUrl' | 'club'>[]
  clubs: Club[]
}

export function HomePage(props: Props) {
  const dimensions = useDimensions()
  const showSideBySide = Boolean(dimensions.width && dimensions.width > 800);
  const showClubList = Boolean(dimensions.width && dimensions.width > 1000);
  const queryResult = useQuery<QueryData>(QUERY);
  const events = queryResult.loading
    ? []
    : (queryResult.data && queryResult.data.events);
  const clubs = queryResult.loading
    ? []
    : (queryResult.data && queryResult.data.clubs);
  console.log({ events, clubs });
  const onSameDay = (event: { date: Event['date' ]}) => moment(event.date).isSame(selectedDate, 'day')
  const query = useUrlSearchParams()
  const [monthSelection, setMonthSelection] = useState(currentDate)
  const selectedDate = selectedDateFromQueryString(query.get('date'))
  const filteredEvents = (events || []).filter(onSameDay)
  const [displayCalendar, setDisplayCalendar] = useState(!selectedDate)
  const history = useHistory()

  function renderCalendar() {
    const hidden = !displayCalendar && !showSideBySide
    return (
      <div
        className={classNames("home-page__calendar-wrapper", {
          "home-page__calendar-wrapper--hidden": hidden
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
      <div className="home-page__event-list-wrapper">
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
      <div className="home-page__club-list-wrapper">
        <ClubList
          clubs={clubs || []}
          renderClub={club => <ClubListItem key={club.name} club={club} />}
          showFirst={15}
        />
      </div>
    )
  }

  return (
    <div className="home-page">
      {showSideBySide ? (
        <>
          <div className="home-page__header">
            {renderSelectedDate()}
          </div>
          <div className={classNames("home-page__content", 'home-page__content--side-by-side')}>
            {showClubList && renderClubList()}
            {renderEventList()}
            {renderCalendar()}
          </div>
        </>
      ) : (
        <>
          <div className="home-page__header">
            {renderSelectedDate()}
          </div>
          <div className={"home-page__content"}>
            {renderCalendar()}
            {renderEventList()}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}