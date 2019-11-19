import React, { useState } from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { EventEditorState, EventEditor } from '../components/EventEditor'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'
import moment from 'moment'
import { useGenres } from '../containers/useGenres'
import { useClubs } from '../containers/useClubs'
import { Button } from '../components/Button'
import { H1Title } from '../components/H1Title'
import { Spacer } from '../components/Spacer'

const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            event {
                id
            }
        }
    }
`

export function AdminAddEventPage() {
    const [monthSelection, setMonthSelection] = useState(moment())
    const genres = useGenres()[0] || []
    const clubs = useClubs()[0] || []
    const [eventEditorState, setEventEditorState] = useState<EventEditorState>(
        {}
    )
    const [createEventMutation] = useMutation(CREATE_EVENT_MUTATION, {
        variables: {
            input: {
                admissionFee: eventEditorState.admissionFee,
                admissionFeeWithDiscount:
                    eventEditorState.admissionFeeWithDiscount,
                amountOfFloors: eventEditorState.amountOfFloors,
                id: eventEditorState.id,
                image: eventEditorState.image,
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

    const canCreate =
        eventEditorState.name && eventEditorState.club && eventEditorState.date
    const history = useHistory()

    const createEvent = async () => {
        const createEventMutationResult = await createEventMutation()
        const eventId = createEventMutationResult.data.createEvent.event.id
        history.push(`/event/${eventId}`)
    }
    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <H1Title>
                    Create Event
                </H1Title>
                <EventEditor
                    monthSelection={monthSelection}
                    setMonthSelection={setMonthSelection}
                    genres={genres}
                    clubs={clubs}
                    state={eventEditorState}
                    setState={setEventEditorState}
                />
                <Spacer />
                <Button primary disabled={!canCreate} onClick={createEvent}>
                    Create
                </Button>
                <Button secondary onClick={() => history.push('/admin')}>
                    Cancel
                </Button>
                <Spacer />
            </Content>
        </Page>
    )
}
