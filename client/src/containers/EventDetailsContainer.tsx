import React from 'react';
import { EventDetails } from "../components/EventDetails";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { useEventWithDetails } from './useEventWithDetails';

type Props = {
    eventId: number | undefined
}

export function EventDetailsContainer(props: Props) {
    const { eventId } = props;
    const event = useEventWithDetails(eventId!)[0]
    if (!eventId) return null
    if (event === undefined) return <LoadingIndicator />
    return <EventDetails event={event} />
}