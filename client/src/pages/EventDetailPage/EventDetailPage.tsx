import './EventDetailPage.scss'
import * as R from 'ramda'
import React from 'react'
import { useParams, useHistory } from 'react-router'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import {
  useEventWithDetails,
  EventWithDetails,
} from '../../components/utils/useEventWithDetails'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { TextWithLineBreaks } from '../../components/TextWithLineBreaks/TextWithLineBreaks'
import { KeyValueField } from '../../components/KeyValueFields/KeyValueField/KeyValueField'
import { FakeLink } from '../../components/FakeLink/FakeLink'
import { KeyValueFields } from '../../components/KeyValueFields/KeyValueFields'
import { H1Title } from '../../components/H1Title/H1Title'
import { Carousel } from '../../components/Carousel'
import { useDimensions } from '../../components/utils/useDimensions'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Header } from '../../components/Header'
import { LinksRenderer } from '../../components/LinksRenderer/LinksRenderer'
import { EditButton } from './EditButton'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Spacer } from '../../components/Layouting/Spacer'
import { DeleteButton } from './DeleteButton'

type Props = {}

type Params = {
  eventId: string
}

const cn = 'event-detail-page'

export default function EventDetailPage(props: Props) {
  const { t } = useTranslation()
  const params = useParams<Params>()
  const eventId = params.eventId ? parseInt(params.eventId, 10) : undefined
  const dimensions = useDimensions()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)
  const history = useHistory()
  const event = useEventWithDetails(eventId!)[0]
  if (!eventId) return null
  if (event === undefined) return <LoadingIndicator />
  const onClubClick = () => history.push(`/club/${event.club.id}`)

  function renderKeyValueFields(event: EventWithDetails) {
    return (
      <KeyValueFields>
        <KeyValueField
          fieldKey={t('date')}
          fieldValue={moment(event.date).format('DD.MM.YYYY')}
          data-cy="eventdetail-date-kv"
        />
        <KeyValueField
          fieldKey={t('club')}
          fieldValue={
            <FakeLink onClick={onClubClick}>{event.club.name}</FakeLink>
          }
          data-cy="eventdetail-club-kv"
        />
        <KeyValueField
          fieldKey={t('priceCategory')}
          fieldValue={
            event.priceCategory
              ? R.times(() => '€', event.priceCategory).join('')
              : ''
          }
          data-cy="eventdetail-pricecategory-kv"
        />
        <KeyValueField
          fieldKey={t('admissionFee')}
          // TODO: ignores 0
          fieldValue={
            event.admissionFee ? event.admissionFee.toFixed(2) + '€' : undefined
          }
          data-cy="eventdetail-admissionfee-kv"
        />
        <KeyValueField
          fieldKey={t('admissionFeeWithDiscount')}
          // TODO: ignores 0
          fieldValue={
            event.admissionFeeWithDiscount
              ? event.admissionFeeWithDiscount.toFixed(2) + '€'
              : undefined
          }
          data-cy="eventdetail-admissionfeewithdiscount-kv"
        />
        <KeyValueField
          fieldKey={t('specials')}
          fieldValue={event.special}
          data-cy="eventdetail-specials-kv"
        />
        <KeyValueField
          fieldKey={t('minimumAge')}
          fieldValue={event.minimumAge ? event.minimumAge + '+' : undefined}
          data-cy="eventdetail-minimumage-kv"
        />
        <KeyValueField
          fieldKey={t('amountOfFloors')}
          fieldValue={
            event.amountOfFloors ? event.amountOfFloors.toString() : undefined
          }
          data-cy="eventdetail-amountoffloors-kv"
        />
        <KeyValueField
          fieldKey={t('genres')}
          fieldValue={
            event.genres
              ? event.genres.map((g) => g.name).join(', ')
              : undefined
          }
          data-cy="eventdetail-genres-kv"
        />
        <KeyValueField
          fieldKey={t('link')}
          fieldValue={
            event.links && event.links.length > 0 ? (
              <LinksRenderer links={event.links} />
            ) : undefined
          }
          data-cy="eventdetail-link-kv"
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
            renderImage={(i) => (
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
          <OnlyVisibleForAdmins>
            <Spacer inline marginRight={3} />
            <EditButton eventId={event.id} />
            <DeleteButton eventId={event.id} />
          </OnlyVisibleForAdmins>
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
          <OnlyVisibleForAdmins>
            <Spacer inline marginRight={3} />
            <EditButton eventId={event.id} />
            <DeleteButton eventId={event.id} />
          </OnlyVisibleForAdmins>
        </H1Title>
        <div className={`${cn}__picture-and-short-info`}>
          {event.imageUrls && event.imageUrls.length > 0 && (
            <Carousel
              className={`${cn}__picture-wrapper`}
              imageCount={event.imageUrls.length}
              renderImage={(i) => (
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
      <Header />
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        {desktop ? renderDesktopContent(event) : renderMobileContent(event)}
      </Content>
    </Page>
  )
}
