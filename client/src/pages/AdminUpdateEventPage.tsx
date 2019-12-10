import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { eventDetailsFragment, EventDetailsEvent } from '../graphqlUtils'
import { useParams, useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import moment from 'moment'
import { useGenres } from '../containers/useGenres'
import { useClubs } from '../containers/useClubs'
import { Button } from '../components/Button'
import { H1Title } from '../components/H1Title'
import { Spacer } from '../components/Spacer'
import { LabeledInput } from '../components/LabeledInput'
import { Input } from '../components/Input'
import { Calendar } from '../components/Calendar'
import { Select } from '../components/Select'
import { Option } from '../components/Option'
import { Textarea } from '../components/Textarea'
import { MultiSelect } from '../components/MultiSelect'
import { ImageFileInput } from '../components/ImageFileInput'
import './AdminUpdateEventPage.scss'

type Params = {
    eventId: string
}

type State = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    club?: {
        id: number
        name: string
    }
    date?: string
    description?: string
    genres?: {
        id: number
        name: string
    }[]
    id?: number
    image?: File
    imageUrl?: string
    link?: string
    minimumAge?: number
    name?: string
    priceCategory?: 1 | 2 | 3
    special?: string
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

const cn = 'admin-update-event-page'

export function AdminUpdateEventPage(props: any) {
    const params = useParams<Params>()
    const { eventId } = params
    const [monthSelection, setMonthSelection] = useState(moment())
    const genres = useGenres()[0] || []
    const clubs = useClubs()[0] || []
    const eventQueryResult = useQuery<QueryData>(EVENT_QUERY, {
        variables: { eventId: parseInt(eventId, 10) },
    })
    const [state, setState] = useState<State>(
        {}
    )
    const [updateEventMutation] = useMutation(UPDATE_EVENT_MUTATION, {
        variables: {
            input: {
                admissionFee: state.admissionFee,
                admissionFeeWithDiscount:
                    state.admissionFeeWithDiscount,
                amountOfFloors: state.amountOfFloors,
                id: state.id,
                clubId: state.club && state.club.id,
                date: state.date,
                description: state.description,
                genreIds: state.genres
                    ? state.genres.map(g => g.id)
                    : undefined,
                image: state.image,
                link: state.link,
                minimumAge: state.minimumAge,
                name: state.name,
                priceCategory: state.priceCategory,
                special: state.special,
            },
        },
        refetchQueries: [{ query: EVENT_QUERY, variables: { eventId: parseInt(eventId, 10) } }]
    })
    const history = useHistory()
    const event = eventQueryResult.data && eventQueryResult.data.event
    useEffect(() => {
        if (!event) return
        setState(event)
    }, [event])

    if (!event) return <LoadingIndicator />

    const updateEvent = async () => {
        await updateEventMutation()
        history.push(`/event/${eventId}`)
    }

    const canSave =
        state.name &&
        state.club &&
        state.date &&
        state.id

    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <H1Title>Edit Event</H1Title>
                <div className={cn}>
                    <LabeledInput label="Name">
                        <Input
                            placeholder="name"
                            value={state.name || ''}
                            onChange={e =>
                                setState({
                                    ...state,
                                    name: e.target.value,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Date">
                        <div className={`${cn}__calendar-wrapper`}>
                            <Calendar
                                monthSelection={monthSelection}
                                setMonthSelection={setMonthSelection}
                                selectedDate={
                                    state.date ? moment(state.date) : undefined
                                }
                                setSelectedDate={date =>
                                    setState({
                                        ...state,
                                        date: date.toISOString(),
                                    })
                                }
                            />
                        </div>
                    </LabeledInput>
                    <LabeledInput label="Club">
                        <Select
                            value={state.club ? state.club.id : ''}
                            onChange={e =>
                                setState({
                                    ...state,
                                    club: clubs.find(
                                        c =>
                                            c.id ===
                                            parseInt(e.target.value, 10)
                                    ),
                                })
                            }
                        >
                            <Option disabled value="">
                                --select--
                            </Option>
                            {clubs.map(c => (
                                <Option value={c.id}>{c.name}</Option>
                            ))}
                        </Select>
                    </LabeledInput>
                    <LabeledInput label="Admission Fee">
                        <Input
                            value={state.admissionFee || ''}
                            min={0}
                            type="number"
                            onChange={e =>
                                setState({
                                    ...state,
                                    admissionFee: parseFloat(e.target.value),
                                })
                            }
                            step={0.01}
                        />
                    </LabeledInput>
                    <LabeledInput label="Admission Fee With Discount">
                        <Input
                            value={state.admissionFeeWithDiscount || ''}
                            min={0}
                            type="number"
                            onChange={e =>
                                setState({
                                    ...state,
                                    admissionFeeWithDiscount: parseFloat(
                                        e.target.value
                                    ),
                                })
                            }
                            step={0.01}
                        />
                    </LabeledInput>
                    <LabeledInput label="Amount of Floors">
                        <Input
                            value={state.amountOfFloors || ''}
                            min={0}
                            type="number"
                            onChange={e =>
                                setState({
                                    ...state,
                                    amountOfFloors: parseInt(
                                        e.target.value,
                                        10
                                    ),
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Description">
                        <Textarea
                            width="20em"
                            value={state.description || ''}
                            onChange={e =>
                                setState({
                                    ...state,
                                    description: e.target.value,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Special">
                        <Textarea
                            width="20em"
                            value={state.special || ''}
                            onChange={e =>
                                setState({
                                    ...state,
                                    special: e.target.value,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Minimum Age">
                        <Input
                            value={state.minimumAge || ''}
                            min={0}
                            type="number"
                            onChange={e =>
                                setState({
                                    ...state,
                                    minimumAge: parseInt(e.target.value, 10),
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Price Category">
                        <Input
                            value={state.priceCategory || ''}
                            min={0}
                            max={3}
                            type="number"
                            onChange={e =>
                                setState({
                                    ...state,
                                    priceCategory: parseInt(
                                        e.target.value,
                                        10
                                    ) as 1 | 2 | 3,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Genres">
                        <MultiSelect
                            getItemKey={item => item.id.toString()}
                            renderItem={item => item.name}
                            items={genres}
                            selectedItems={state.genres || []}
                            onChange={genres =>
                                setState({
                                    ...state,
                                    genres,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Link">
                        <Input
                            value={state.link || ''}
                            onChange={e =>
                                setState({
                                    ...state,
                                    link: e.target.value,
                                })
                            }
                        />
                    </LabeledInput>
                    <LabeledInput label="Image">
                        <ImageFileInput
                            imageUrl={state.imageUrl}
                            onChange={image => setState({ ...state, image })}
                        />
                    </LabeledInput>
                </div>
                <Spacer />
                <Button primary disabled={!canSave} onClick={updateEvent}>
                    Save
                </Button>
                <Button secondary onClick={() => history.push('/admin')}>
                    Cancel
                </Button>
                <Spacer />
            </Content>
        </Page>
    )
}
