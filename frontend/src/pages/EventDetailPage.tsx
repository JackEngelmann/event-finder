import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router'
import { Event } from '../types'
import './EventDetailPage.css'
import { TextWithLineBreaks } from '../components/TextWithLineBreaks'
import { Footer } from '../components/Footer'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

type Props = {}

type Params = {
    eventId: string
}

const QUERY = gql`
    query eventQuery($eventId: Int!) {
        event(id: $eventId) {
            id
            name
            description
            date
            imageUrl
        }
    }
`

export function EventDetailPage(props: Props) {
    const params = useParams<Params>()
    const { eventId } = params
    const queryResult = useQuery(QUERY, {
        variables: { eventId: parseInt(eventId, 10) }
    })
    const event = queryResult.data && queryResult.data.event
    console.log(event)
    const history = useHistory()
    const search = useLocation().search

    function renderHeader() {
        return (
            <div className="event-detail-page__header">
                <button
                    onClick={() => history.push('/' + search)}
                    className="event-detail-page__go-back-button"
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
                <img className="event-detail-page__event-picture" src={'./' + event.imageUrl} />
                <div className="event-detail-page__content">
                    <h1>{event.name}</h1>
                    <section>
                        <TextWithLineBreaks text={event.description} />
                    </section>
                </div>
            </>
        )
    }
    return (
        <div className="event-detail-page">
            {renderHeader()}
            {event === undefined ? renderLoading() : renderEventDetails(event)}
            <Footer />
        </div>
    )
}