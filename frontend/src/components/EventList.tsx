import React, { ReactNode } from 'react'
import { Event } from "../api";
import './EventList.css'

type Props = {
    events: Event[]
    renderEvent: (event: Event) => ReactNode
}
export function EventList(props: Props) {
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