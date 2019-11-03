import './EventDetails.scss'
import * as R from 'ramda'
import React from 'react'
import { TextWithLineBreaks } from './TextWithLineBreaks'
import { Event } from '../api'
import { KeyValueFields } from './KeyValueFields'
import { KeyValueField } from './KeyValueField'
import { H1Title } from './H1Title'

type Props = {
    event: Event
}

// TODO: use KeyValueFields in container ? could type properly
const cn = 'event-details'

export function EventDetails(props: Props) {
    const { event } = props
    return (
        <div className={cn}>
            <div className={`${cn}__content`}>
                <H1Title>{event.name}</H1Title>
                <div className={`${cn}__picture-and-short-info`}>
                    <div className={`${cn}__picture-wrapper`}>
                        <img
                            className={`${cn}__picture`}
                            src={'./' + event.imageUrl}
                            alt="event"
                        />
                    </div>
                    <KeyValueFields>
                        <KeyValueField
                            fieldKey="Club"
                            fieldValue={event.club.name}
                        />
                        <KeyValueField
                            fieldKey="Price Category"
                            fieldValue={
                                event.priceCategory
                                    ? R.times(
                                          () => '€',
                                          event.priceCategory
                                      ).join('')
                                    : ''
                            }
                        />
                        <KeyValueField
                            fieldKey="Admission Fee"
                            // TODO: ignores 0
                            fieldValue={
                                event.admissionFee
                                    ? event.admissionFee.toFixed(2) + '€'
                                    : undefined
                            }
                        />
                        <KeyValueField
                            fieldKey="Admission Fee With Discount"
                            // TODO: ignores 0
                            fieldValue={
                                event.admissionFeeWithDiscount
                                    ? event.admissionFeeWithDiscount.toFixed(
                                          2
                                      ) + '€'
                                    : undefined
                            }
                        />
                        <KeyValueField
                            fieldKey="Special"
                            fieldValue={event.special}
                        />
                        <KeyValueField
                            fieldKey="Minimum Age"
                            fieldValue={
                                event.minimumAge
                                    ? event.minimumAge + '+'
                                    : undefined
                            }
                        />
                        <KeyValueField
                            fieldKey="Amount of Floors"
                            fieldValue={
                                event.amountOfFloors
                                    ? event.amountOfFloors.toString()
                                    : undefined
                            }
                        />
                        <KeyValueField
                            fieldKey="Genres"
                            fieldValue={
                                event.genres
                                    ? event.genres.map(g => g.name).join(', ')
                                    : undefined
                            }
                        />
                    </KeyValueFields>
                </div>
                <section>
                    <TextWithLineBreaks text={event.description} />
                </section>
            </div>
        </div>
    )
}
