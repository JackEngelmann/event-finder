import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { eventDetailsFragment, EventDetailsEvent } from '../graphqlUtils'
import { useParams, useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { EventEditorState, EventEditor } from '../components/EventEditor'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import moment from 'moment'
import { useGenres } from '../containers/useGenres'
import { useClubs } from '../containers/useClubs'

type Params = {
    eventId: string
}

// TODO: store entities in state, transform to id when doing mutation

const EVENT_QUERY = gql`
    query eventQuery($eventId: Int!) {
        event(id: $eventId) {
            ...EventDetails
        }
    }
    ${eventDetailsFragment}
`
type QueryData = { event: EventDetailsEvent }

const UPDATE_EVENT_MUTATION = gql`
    mutation UpdateEvent($input: UpdateEventInput!) {
        updateEvent(input: $input) {
            event {
                ...EventDetails
            }
        }
    }
    ${eventDetailsFragment}
`

export function AdminUpdateEventPage(props: any) {
    const params = useParams<Params>()
    const { eventId } = params
    const [monthSelection, setMonthSelection] = useState(moment())
    const genres = useGenres()[0] || []
    const clubs = useClubs()[0] || []
    const eventQueryResult = useQuery<QueryData>(EVENT_QUERY, {
        variables: { eventId: parseInt(eventId, 10) },
    })
    const [eventEditorState, setEventEditorState] = useState<EventEditorState>(
        {}
    )
    const [updateEventMutation] = useMutation(UPDATE_EVENT_MUTATION, {
        variables: {
            input: {
                admissionFee: eventEditorState.admissionFee,
                admissionFeeWithDiscount:
                    eventEditorState.admissionFeeWithDiscount,
                amountOfFloors: eventEditorState.amountOfFloors,
                id: eventEditorState.id,
                clubId: eventEditorState.club && eventEditorState.club.id,
                date: eventEditorState.date,
                description: eventEditorState.description,
                genreIds: eventEditorState.genres
                    ? eventEditorState.genres.map(g => g.id)
                    : undefined,
                minimumAge: eventEditorState.minimumAge,
                name: eventEditorState.name,
                priceCategory: eventEditorState.priceCategory,
                special: eventEditorState.special,
            },
        },
    })
    const history = useHistory()
    const event = eventQueryResult.data && eventQueryResult.data.event
    useEffect(() => {
        if (!event) return
        setEventEditorState(event)
    }, [event])

    if (!event) return <LoadingIndicator />

    const updateEvent = async () => {
        await updateEventMutation()
        history.push(`/event/${eventId}`)
    }

    const canSave =
        eventEditorState.name &&
        eventEditorState.club &&
        eventEditorState.date &&
        eventEditorState.id

    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <EventEditor
                    clubs={clubs}
                    genres={genres}
                    monthSelection={monthSelection}
                    setMonthSelection={setMonthSelection}
                    state={eventEditorState}
                    setState={setEventEditorState}
                />
                <button disabled={!canSave} onClick={updateEvent}>
                    Save
                </button>
            </Content>
        </Page>
    )
}
