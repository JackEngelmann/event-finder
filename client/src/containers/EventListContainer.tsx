import React from 'react'
import { EventList } from '../components/EventList'
import { EventCard } from '../components/EventCard'
import gql from 'graphql-tag'
import { Event } from '../api'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { LoadingIndicator } from '../components/LoadingIndicator'

type Props = {
    selectedDate: moment.Moment | undefined
    desktop?: boolean
    onEventClick: (event: { id: number }) => void
}

const EVENTS_QUERY = gql`
    query homePageEventsQuery($eventsQueryFilter: EventsQueryFilter) {
        events(filter: $eventsQueryFilter) {
            id
            name
            date
            imageUrl
            club {
                id
                name
            }
        }
    }
`
type EventsQueryData = {
    events: Pick<Event, 'id' | 'name' | 'date' | 'imageUrl' | 'club'>[]
}

export function EventListContainer(props: Props) {
    const { selectedDate, desktop, onEventClick } = props
    const eventsQueryResult = useQuery<EventsQueryData>(EVENTS_QUERY, {
        variables: {
            eventsQueryFilter: {
                date: selectedDate && selectedDate.toISOString(),
            },
        },
    })
    const events = eventsQueryResult.data && eventsQueryResult.data.events
    return events ? (
        <EventList
            events={events}
            renderEvent={event => (
                <EventCard
                    desktop={desktop}
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick({ id: event.id })}
                />
            )}
        />
    ) : (
        <LoadingIndicator />
    )
}
