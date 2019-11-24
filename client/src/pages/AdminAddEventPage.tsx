import React, { useState } from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { MultiSelectCalendar } from '../components/MultiSelectCalendar'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'
import moment from 'moment'
import { useGenres } from '../containers/useGenres'
import { useClubs } from '../containers/useClubs'
import { Button } from '../components/Button'
import { H1Title } from '../components/H1Title'
import { Spacer } from '../components/Spacer'
import { LabeledInput } from '../components/LabeledInput'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Option } from '../components/Option'
import { Textarea } from '../components/Textarea'
import { MultiSelect } from '../components/MultiSelect'
import { ImageFileInput } from '../components/ImageFileInput'
import './AdminAddEventPage.scss'

const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent($input: CreateEventInput!) {
        createEvent(input: $input) {
            event {
                id
            }
        }
    }
`

type State = {
    admissionFee?: number
    admissionFeeWithDiscount?: number
    amountOfFloors?: number
    club?: {
        id: number
        name: string
    }
    dates: string[]
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

const cn = 'admin-add-event-page'

export function AdminAddEventPage() {
    const [monthSelection, setMonthSelection] = useState(moment())
    const genres = useGenres()[0] || []
    const clubs = useClubs()[0] || []
    const [state, setState] = useState<State>({
        dates: [],
    })
    const [createEventMutation] = useMutation(CREATE_EVENT_MUTATION)

    const canCreate = state.name && state.club && state.dates.length >= 1
    const history = useHistory()

    const createEvent = async () => {
        const mutations = state.dates.map(date => createEventMutation({
            variables: {
                input: {
                    admissionFee: state.admissionFee,
                    admissionFeeWithDiscount: state.admissionFeeWithDiscount,
                    amountOfFloors: state.amountOfFloors,
                    id: state.id,
                    image: state.image,
                    clubId: state.club && state.club.id,
                    date,
                    description: state.description,
                    genreIds: state.genres
                        ? state.genres.map(g => g.id)
                        : undefined,
                    link: state.link,
                    minimumAge: state.minimumAge,
                    name: state.name,
                    priceCategory: state.priceCategory,
                    special: state.special,
                },
            },
        }))
        const results = await Promise.all(mutations)
        const eventId = results[0].data.createEvent.event.id
        history.push(`/event/${eventId}`)
    }
    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <H1Title>Create Event</H1Title>
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
                            <MultiSelectCalendar
                                monthSelection={monthSelection}
                                setMonthSelection={setMonthSelection}
                                selectedDates={state.dates.map(d => moment(d))}
                                setSelectedDates={dates =>
                                    setState({
                                        ...state,
                                        dates: dates.map(d => d.toISOString()),
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
