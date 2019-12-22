import React from 'react'
import { EventListView } from './EventListView'
import { EventCard } from '../EventCard/EventCard'
import gql from 'graphql-tag'
import { Event } from '../../api'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import { useTranslation } from 'react-i18next'
import { NetworkError } from '../NetworkError'

type Props = {
    selectedDate: moment.Moment | undefined
    desktop?: boolean
    onEventClick: (event: { id: number }) => void
}

const EVENTS_QUERY = gql`
    query eventsPageEventsQuery($eventsQueryFilter: EventsQueryFilter) {
        events(filter: $eventsQueryFilter) {
            id
            name
            date
            imageUrls
            club {
                id
                name
            }
        }
    }
`
type EventsQueryData = {
    events: Pick<Event, 'id' | 'name' | 'date' | 'imageUrls' | 'club'>[]
}

export function EventListContainer(props: Props) {
    const { selectedDate, desktop, onEventClick } = props
    const { t } = useTranslation()
    const eventsQueryResult = useQuery<EventsQueryData>(EVENTS_QUERY, {
        variables: {
            eventsQueryFilter: {
                date: selectedDate && selectedDate.toISOString(),
            },
        },
    })
    const events = eventsQueryResult.data && eventsQueryResult.data.events
    if (eventsQueryResult.error) return <NetworkError />
    if (eventsQueryResult.loading) return <LoadingIndicator />
    return events ? (
        <EventListView
            events={events}
            renderEvent={event => (
                <EventCard
                    desktop={desktop}
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick({ id: event.id })}
                />
            )}
            texts={{
                noEventsToday: t('noEventsToday')
            }}
        />
    ) : (
        <LoadingIndicator />
    )
}
