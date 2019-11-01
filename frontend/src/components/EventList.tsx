import React, { ReactNode } from 'react'
import { Event } from "../api";
import './EventList.scss'

type Props<Event> = {
    events: Event[]
    renderEvent: (event: Event) => ReactNode
}
export function EventList<Event>(props: Props<Event>) {
    const { events, renderEvent } = props;

    function renderContent() {
        if (events === undefined) return 'Loading...'
        if (events.length === 0) return 'No events listed today'
        return events.map(renderEvent)
    }

    return (
        <div className="event-list">
            {renderContent()}
        </div>
    )
}