import React from 'react'
import { Event } from "./api";
import './EventList.css'
import { EventCard } from './EventCard';

type Props = {
    events: Event[]
}
export function EventList(props: Props) {
    const { events } = props;

    function renderContent() {
        if (events === undefined) return 'Loading...'
        if (events.length === 0) return 'No events listed today'
        return events.map(renderEvent)
    }

    function renderEvent(event: Event) {
        return (
            <EventCard key={event.id} event={event} />
        )
    }

    return (
        <div className="event-list">
            {renderContent()}
        </div>
    )
}