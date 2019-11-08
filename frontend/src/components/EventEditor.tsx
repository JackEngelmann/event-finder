import './EventEditor.scss'
import React from 'react'
import { Calendar } from './Calendar'
import moment, { Moment } from 'moment'
import { LabeledInput } from './LabeledInput'
import { Input } from './Input'
import { Textarea } from './Textarea'
import { Select } from './Select'
import { Option } from './Option'

export type EventEditorState = {
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
    minimumAge?: number
    name?: string
    priceCategory?: 1 | 2 | 3
    special?: string
}

// TODO: image

type Props = {
    state: EventEditorState
    setState: (state: EventEditorState) => void
    monthSelection: Moment
    setMonthSelection: (monthSelection: Moment) => void
    clubs: {
        id: number
        name: string
    }[]
    genres: {
        id: number
        name: string
    }[]
}

const cn = 'event-editor'

export function EventEditor(props: Props) {
    const {
        state,
        setState,
        monthSelection,
        clubs,
        genres,
        setMonthSelection,
    } = props
    return (
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
                                c => c.id === parseInt(e.target.value, 10)
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
                            amountOfFloors: parseInt(e.target.value, 10),
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
                            priceCategory: parseInt(e.target.value, 10) as (
                                | 1
                                | 2
                                | 3),
                        })
                    }
                />
            </LabeledInput>
            <LabeledInput label="Genres">
                <div>
                    {genres.map(g => (
                        <div>
                            <Input
                                name={g.name}
                                type="checkbox"
                                checked={
                                    state.genres
                                        ? state.genres.some(
                                              g2 => g2.id === g.id
                                          )
                                        : false
                                }
                                onChange={e => {
                                    const genres = state.genres || []
                                    if (e.target.checked) {
                                        setState({
                                            ...state,
                                            genres: [...genres, g],
                                        })
                                    } else {
                                        setState({
                                            ...state,
                                            genres: genres.filter(
                                                g2 => g2.id !== g.id
                                            ),
                                        })
                                    }
                                }}
                            />
                            {g.name}
                        </div>
                    ))}
                </div>
            </LabeledInput>
        </div>
    )
}
