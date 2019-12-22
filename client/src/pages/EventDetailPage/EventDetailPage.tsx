import './EventDetailPage.scss'
import * as R from 'ramda'
import React from 'react'
import { useParams, useHistory } from 'react-router'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Button } from '../../components/Button/Button'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import {
  useEventWithDetails,
  EventWithDetails,
} from '../../components/utils/useEventWithDetails'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { TextWithLineBreaks } from '../../components/TextWithLineBreaks/TextWithLineBreaks'
import { KeyValueField } from '../../components/KeyValueFields/KeyValueField/KeyValueField'
import { LinkRenderer } from '../../components/LinkRenderer/LinkRenderer'
import { FakeLink } from '../../components/FakeLink/FakeLink'
import { KeyValueFields } from '../../components/KeyValueFields/KeyValueFields'
import { H1Title } from '../../components/H1Title/H1Title'
import { Icon } from '../../components/Icon/Icon'
import { Carousel } from '../../components/Carousel'
import { useDimensions } from '../../components/utils/useDimensions'

type Props = {}

type Params = {
  eventId: string
}

const cn = 'event-detail-page'

export function EventDetailPage(props: Props) {
  const params = useParams<Params>()
  const eventId = params.eventId ? parseInt(params.eventId, 10) : undefined
  const dimensions = useDimensions()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)
  const history = useHistory()
  const event = useEventWithDetails(eventId!)[0]
  if (!eventId) return null
  if (event === undefined) return <LoadingIndicator />
  const onClubClick = () => history.push(`/club/${event.club.id}`)

  function renderEditButton() {
    return (
      <OnlyVisibleForAdmins>
        <Button
          className={`${cn}__edit-button`}
          onClick={() => history.push(`/admin/event/${eventId}`)}
        >
          <Icon icon="pen" />
        </Button>
      </OnlyVisibleForAdmins>
    )
  }

  function renderKeyValueFields(event: EventWithDetails) {
    return (
      <KeyValueFields>
        <KeyValueField
          fieldKey="Club"
          fieldValue={
            <FakeLink onClick={onClubClick}>{event.club.name}</FakeLink>
          }
        />
        <KeyValueField
          fieldKey="Price Category"
          fieldValue={
            event.priceCategory
              ? R.times(() => '€', event.priceCategory).join('')
              : ''
          }
        />
        <KeyValueField
          fieldKey="Admission Fee"
          // TODO: ignores 0
          fieldValue={
            event.admissionFee ? event.admissionFee.toFixed(2) + '€' : undefined
          }
        />
        <KeyValueField
          fieldKey="Admission Fee With Discount"
          // TODO: ignores 0
          fieldValue={
            event.admissionFeeWithDiscount
              ? event.admissionFeeWithDiscount.toFixed(2) + '€'
              : undefined
          }
        />
        <KeyValueField fieldKey="Special" fieldValue={event.special} />
        <KeyValueField
          fieldKey="Minimum Age"
          fieldValue={event.minimumAge ? event.minimumAge + '+' : undefined}
        />
        <KeyValueField
          fieldKey="Amount of Floors"
          fieldValue={
            event.amountOfFloors ? event.amountOfFloors.toString() : undefined
          }
        />
        <KeyValueField
          fieldKey="Genres"
          fieldValue={
            event.genres ? event.genres.map(g => g.name).join(', ') : undefined
          }
        />
        <KeyValueField
          fieldKey="Link"
          fieldValue={event.link && <LinkRenderer href={event.link} />}
        />
      </KeyValueFields>
    )
  }

  function renderMobileContent(event: EventWithDetails) {
    return (
      <div className={cn}>
        {event.imageUrls && event.imageUrls.length > 0 && (
          <Carousel
            className={`${cn}__carousel`}
            imageCount={event.imageUrls.length}
            renderImage={i => (
              <div className={`${cn}__picture-wrapper`}>
                <img
                  className={`${cn}__picture`}
                  src={event.imageUrls![i]}
                  alt={`event ${event.name}`}
                />
              </div>
            )}
          />
        )}
        <H1Title hideDivider>
          {event.name}
          {renderEditButton()}
        </H1Title>
        {renderKeyValueFields(event)}
        {renderDescription(event)}
      </div>
    )
  }

  function renderDesktopContent(event: EventWithDetails) {
    return (
      <div className={cn}>
        <H1Title>
          {event.name}
          {renderEditButton()}
        </H1Title>
        <div className={`${cn}__picture-and-short-info`}>
          {event.imageUrls && event.imageUrls.length > 0 && (
            <Carousel
              className={`${cn}__picture-wrapper`}
              imageCount={event.imageUrls.length}
              renderImage={i => (
                <img
                  className={`${cn}__picture`}
                  src={event.imageUrls![i]}
                  alt={`event ${event.name}`}
                />
              )}
            />
          )}
          {renderKeyValueFields(event)}
        </div>
        {renderDescription(event)}
      </div>
    )
  }

  function renderDescription(event: EventWithDetails) {
    return (
      <section>
        <TextWithLineBreaks text={event.description} />
      </section>
    )
  }

  return (
    <Page>
      <HeaderContainer />
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        {desktop ? renderDesktopContent(event) : renderMobileContent(event)}
      </Content>
    </Page>
  )
}
