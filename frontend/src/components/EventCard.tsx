import React from 'react'
import { Event } from '../api'
import './EventCard.css'
import classNames from 'classnames'

type Props = {
    event: Event
    onClick: () => void
    desktop: boolean
}
export function EventCard(props: Props) {
    const { event, onClick, desktop } = props
    return (
        <div className={classNames("event-card", { 'event-card--desktop': desktop, 'event-card--mobile': !desktop })} onClick={onClick}>
            <div className="event-card__picture-wrapper">
                <img className="event-card__picture" src={'./' + event.imageUrl} alt={`Image for event ${event.name}`} />
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
    )
}