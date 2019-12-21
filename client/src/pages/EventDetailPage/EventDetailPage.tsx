import './EventDetailPage.scss'
import * as R from 'ramda'
import React from 'react'
import { useParams, useHistory } from 'react-router'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Button } from '../../components/Button/Button'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { useEventWithDetails } from '../../components/utils/useEventWithDetails'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { TextWithLineBreaks } from '../../components/TextWithLineBreaks/TextWithLineBreaks'
import { KeyValueField } from '../../components/KeyValueFields/KeyValueField/KeyValueField'
import { LinkRenderer } from '../../components/LinkRenderer/LinkRenderer'
import { FakeLink } from '../../components/FakeLink/FakeLink'
import { KeyValueFields } from '../../components/KeyValueFields/KeyValueFields'
import { H1Title } from '../../components/H1Title/H1Title'
import { Icon } from '../../components/Icon/Icon'

type Props = {}

type Params = {
    eventId: string
}

const cn = 'event-detail-page'

export function EventDetailPage(props: Props) {
    const params = useParams<Params>()
    const eventId = params.eventId ? parseInt(params.eventId, 10) : undefined
    const history = useHistory()
    const event = useEventWithDetails(eventId!)[0]
    if (!eventId) return null
    if (event === undefined) return <LoadingIndicator />
    const onClubClick = () => history.push(`/club/${event.club.id}`)

    return (
        <Page>
            <HeaderContainer />
            <Content restrictMaxWidth scrollable>
                <div className={cn}>
                    <div className={`${cn}__content`}>
                        <H1Title>
                            {event.name}
                            <OnlyVisibleForAdmins>
                                <Button
                                    className={`${cn}__edit-button`}
                                    onClick={() =>
                                        history.push(`/admin/event/${eventId}`)
                                    }
                                >
                                    <Icon icon="pen" />
                                </Button>
                            </OnlyVisibleForAdmins>
                        </H1Title>
                        <div className={`${cn}__picture-and-short-info`}>
                            <div className={`${cn}__picture-wrapper`}>
                                <img
                                    className={`${cn}__picture`}
                                    src={
                                        event.imageUrls
                                            ? event.imageUrls[0]
                                            : undefined
                                    }
                                    alt="event"
                                />
                            </div>
                            <KeyValueFields>
                                <KeyValueField
                                    fieldKey="Club"
                                    fieldValue={
                                        <FakeLink onClick={onClubClick}>
                                            {event.club.name}
                                        </FakeLink>
                                    }
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
                                            ? event.admissionFee.toFixed(2) +
                                              '€'
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
                                            ? event.genres
                                                  .map(g => g.name)
                                                  .join(', ')
                                            : undefined
                                    }
                                />
                                <KeyValueField
                                    fieldKey="Link"
                                    fieldValue={
                                        event.link && (
                                            <LinkRenderer href={event.link} />
                                        )
                                    }
                                />
                            </KeyValueFields>
                        </div>
                        <section>
                            <TextWithLineBreaks text={event.description} />
                        </section>
                    </div>
                </div>
            </Content>
        </Page>
    )
}
