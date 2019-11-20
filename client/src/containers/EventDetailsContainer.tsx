import React from 'react'
import { EventDetails } from '../components/EventDetails'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useEventWithDetails } from './useEventWithDetails'
import { useHistory } from 'react-router-dom'

type Props = {
    eventId: number | undefined
}

export function EventDetailsContainer(props: Props) {
    const { eventId } = props
    const event = useEventWithDetails(eventId!)[0]
    const history = useHistory()
    if (!eventId) return null
    if (event === undefined) return <LoadingIndicator />
    return (
        <EventDetails
            event={event}
            onClubClick={() => history.push(`/club/${event.club.id}`)}
        />
    )
}
