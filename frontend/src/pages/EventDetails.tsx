import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router'
import { useEvent, Event } from '../api'
import './EventDetails.css'
import { TextWithLineBreaks } from '../components/TextWithLineBreaks'
import { useDimensions } from '../components/useDimensions'
import { Footer } from '../components/Footer'

type Props = {}

type Params = {
    eventId: string
}

export function EventDetails(props: Props) {
    const params = useParams<Params>()
    const { eventId } = params
    const event = useEvent(eventId);
    const history = useHistory()
    const search = useLocation().search
    const dimensions = useDimensions()
    const showHeader = Boolean(dimensions.width && dimensions.width < 600)

    function renderHeader() {
        return (
            <div className="event-details__header">
                <button
                    onClick={() => history.push('/' + search)}
                    className="event-details__go-back-button"
                >
                    {"<-"}
                </button>
            </div>
        )
    }

    function renderLoading() {
        return 'Loading'
    }

    function renderEventDetails(event: Event) {
        return (
            <>
                <img className="event-details__event-picture" src={'./' + event.imageUrl} />
                <div className="event-details__content">
                    <h1>{event.name}</h1>
                    <section>
                        <TextWithLineBreaks text={event.description} />
                    </section>
                </div>
            </>
        )
    }
    return (
        <div className="event-details">
            {renderHeader()}
            {event === undefined ? renderLoading() : renderEventDetails(event)}
            <Footer />
        </div>
    )
}