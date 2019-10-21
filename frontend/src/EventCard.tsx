import React from 'react'
import { Event } from './api'
import './EventCard.css'

type Props = {
    event: Event
}
export function EventCard(props: Props) {
    const { event } = props
    return <div className="event-card">
        <div className="event-card__picture">
            Some Picture
        </div>
        <div className="event-card__information">
            <div className="event-card__name">
                {event.name}
            </div>
            <div className="event-card__club-name">
                {event.club.name}
            </div>
        </div>
    </div>
}