import './EventsPage.scss'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useDimensions } from '../../components/utils/useDimensions'
import { useSelectedDate } from '../../components/utils/useSelectedDate'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Page } from '../../components/Page/Page'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { Content } from '../../components/Content/Content'
import { ClubListContainer } from '../../components/ClubList/ClubListContainer'
import { Calendar } from '../../components/Calendar'
import { useTranslation } from 'react-i18next'
import { DayQuickSwitch } from '../../components/DayQuickSwitch'
import gql from 'graphql-tag'
import { NetworkError } from '../../components/NetworkError'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { useQuery } from '@apollo/react-hooks'
import { EventList } from '../../components/EventList'
import { EventCard } from '../../components/EventCard/EventCard'

type Props = {}

const EVENTS_QUERY = gql`
  query eventsPageEventsQuery($eventsQueryFilter: EventsQueryFilter) {
    events(filter: $eventsQueryFilter) {
      id
      name
      date
      imageUrls
      genres {
        id
        name
      }
      priceCategory
      club {
        id
        name
      }
    }
  }
`
type EventsQueryData = {
  events: {
    id: number
    name: string
    date: string
    imageUrls: string[] | undefined
    club: {
      id: number
      name: string
    }
    genres: {
      id: number
      name: string
    }[]
    priceCategory: number
  }[]
}

const currentDate = moment()

const cn = 'events-page'

export default function EventsPage(props: Props) {
  const dimensions = useDimensions()

  // rerenders component when locale changes -> has influence on moment.js
  const { t } = useTranslation()

  const [selectedDate, setSelectedDate] = useSelectedDate()
  const [monthSelection, setMonthSelection] = useState(
    selectedDate || currentDate
  )
  const locale = t('locale').toString()

  useEffect(() => {
    if (monthSelection.locale() !== locale) {
      setMonthSelection(moment(monthSelection.locale(locale)))
    }
  }, [locale, monthSelection])

  const eventsQueryResult = useQuery<EventsQueryData>(EVENTS_QUERY, {
    variables: {
      eventsQueryFilter: {
        date: selectedDate && selectedDate.toISOString(),
      },
    },
  })
  const events = eventsQueryResult.data && eventsQueryResult.data.events

  const history = useHistory()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)
  const showClubList = Boolean(!dimensions.width || dimensions.width > 1000)
  const search = useLocation().search

  if (!selectedDate) {
    return <Redirect to={`/event?date=${moment().toISOString()}`} />
  }
  if (eventsQueryResult.error) return <NetworkError />
  if (eventsQueryResult.loading) return <LoadingIndicator />

  const onEventClick = (event: { id: number }) =>
    history.push(`/event/${event.id}${search}`)

  function renderDesktopContent() {
    return (
      <>
        <div className={`${cn}__title`}>
          Events on {selectedDate!.format('D. MMMM')}
        </div>
        <div className={`${cn}__calendar-anchor`}>
          <div className={`${cn}__calendar-wrapper`}>
            <Calendar
              monthSelection={monthSelection}
              setMonthSelection={setMonthSelection}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
        <Content scrollable restrictMaxWidth={desktop}>
          {showClubList && (
            <div className={`${cn}__club-list-wrapper`}>
              <ClubListContainer />
            </div>
          )}
          <div className={`${cn}__event-list-wrapper`}>
            <EventList
              events={events}
              renderEvent={event => (
                <EventCard
                  desktop
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick({ id: event.id })}
                />
              )}
              texts={{ empty: t('noEventsToday') }}
            />
          </div>
        </Content>
      </>
    )
  }

  function renderMobileContent() {
    return (
      <>
        <HeaderContainer>
          <div>
            {selectedDate ? (
              <DayQuickSwitch
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            ) : (
              'Pick a Date'
            )}
          </div>
        </HeaderContainer>
        <Content scrollable restrictMaxWidth={desktop}>
          <EventList
            events={events}
            renderEvent={event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick({ id: event.id })}
              />
            )}
            texts={{ empty: t('noEventsToday') }}
          />
        </Content>
      </>
    )
  }
  return (
    <Page className={cn}>
      {desktop ? renderDesktopContent() : renderMobileContent()}
    </Page>
  )
}
