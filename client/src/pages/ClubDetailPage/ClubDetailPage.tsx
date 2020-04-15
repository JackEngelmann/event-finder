import './ClubDetailPage.scss'
import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { useParams, useHistory } from 'react-router'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Button } from '../../components/Button/Button'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { H1Title } from '../../components/H1Title/H1Title'
import { KeyValueFields } from '../../components/KeyValueFields/KeyValueFields'
import { KeyValueField } from '../../components/KeyValueFields/KeyValueField/KeyValueField'
import { LinkRenderer } from '../../components/LinkRenderer/LinkRenderer'
import { TextWithLineBreaks } from '../../components/TextWithLineBreaks/TextWithLineBreaks'
import { Icon } from '../../components/Icon/Icon'
import { useDimensions } from '../../components/utils/useDimensions'
import { Carousel } from '../../components/Carousel'
import { NetworkError } from '../../components/NetworkError'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { EventCard } from '../../components/EventCard/EventCard'
import { UpcomingEvents } from './UpcomingEvents/UpcomingEvents'
import { Spacer } from '../../components/Layouting/Spacer'
import { Header } from '../../components/Header'
import { LinksRenderer } from '../../components/LinksRenderer/LinksRenderer'

type Props = {}

type Params = {
  clubId: string
}

const cn = 'club-detail-page'

const EVENTS_SHOW_FIRST = 3

export const CLUB_DETAIL_QUERY = gql`
  query clubDetailQuery($clubId: Int!, $fromDay: String!) {
    club(id: $clubId) {
      address
      contact
      description
      email
      events(fromDay: $fromDay) {
        club {
          id
          name
        }
        date
        genres {
          id
          name
        }
        id
        imageUrls
        name
        priceCategory
      }
      id
      imageUrls
      links {
        href
        type
      }
      name
      region
      specials
    }
  }
`

type QueriedClub = {
  address?: string
  contact?: string
  description?: string
  email?: string
  events: {
    id: number
    name: string
    date: string
    club: {
      id: number
      name: string
    }
    genres: {
      id: number
      name: string
    }[]
    priceCategory: number
  }[]
  id: number
  imageUrls?: string[]
  links: { href: string; type: 'FACEBOOK' | 'HOMEPAGE' }[]
  name: string
  region?: string
  specials?: string
}
type ClubQueryData = {
  club: QueriedClub
}
type QueriedEvent = QueriedClub['events'][number]

export const today = moment()

export default function ClubDetailPage(props: Props) {
  const params = useParams<Params>()
  const { t } = useTranslation()
  const history = useHistory()
  const clubId = parseInt(params.clubId)
  const dimensions = useDimensions()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)
  const onEventClick = (event: { id: number }) =>
    history.push(`/event/${event.id}`)
  const clubQueryResult = useQuery<ClubQueryData>(CLUB_DETAIL_QUERY, {
    variables: { clubId, fromDay: today.toISOString() },
  })
  const club = clubQueryResult.data && clubQueryResult.data.club
  if (clubQueryResult.error) return <NetworkError />
  if (!club) return <LoadingIndicator />

  function renderDescription(club: QueriedClub) {
    return (
      <section>
        <TextWithLineBreaks text={club.description || ''} />
      </section>
    )
  }

  function renderKeyValueFields(club: QueriedClub) {
    return (
      <KeyValueFields>
        <KeyValueField
          fieldKey={t('address')}
          fieldValue={club.address}
          data-cy="clubdetailpage-address-kv"
        />
        <KeyValueField
          fieldKey={t('region')}
          fieldValue={club.region}
          data-cy="clubdetailpage-region-kv"
        />
        <KeyValueField
          fieldKey={t('contact')}
          fieldValue={club.contact}
          data-cy="clubdetailpage-contact-kv"
        />
        <KeyValueField
          fieldKey={t('email')}
          fieldValue={club.email}
          data-cy="clubdetailpage-email-kv"
        />
        <KeyValueField
          fieldKey={t('specials')}
          fieldValue={club.specials}
          data-cy="clubdetailpage-specials-kv"
        />
        <KeyValueField
          fieldKey={t('link')}
          fieldValue={
            club.links && club.links.length > 0 ? (
              <LinksRenderer links={club.links} />
            ) : undefined
          }
          data-cy="clubdetailpage-link-kv"
        />
      </KeyValueFields>
    )
  }

  function renderEditButton() {
    return (
      <OnlyVisibleForAdmins>
        <Button
          className={`${cn}__edit-button`}
          data-cy="clubdetailpage-edit-button"
          onClick={() => history.push(`/admin/club/${clubId}`)}
        >
          <Icon icon="pen" />
        </Button>
      </OnlyVisibleForAdmins>
    )
  }

  function renderMobileContent(club: QueriedClub) {
    return (
      <div className={cn}>
        {club.imageUrls && club.imageUrls.length > 0 && (
          <Carousel
            className={`${cn}__carousel`}
            imageCount={club.imageUrls.length}
            renderImage={(i) => (
              <div className={`${cn}__picture-wrapper`}>
                <img
                  className={`${cn}__picture`}
                  src={club.imageUrls![i]}
                  alt={`club ${club.name}`}
                />
              </div>
            )}
          />
        )}
        <H1Title hideDivider>
          {club.name}
          {renderEditButton()}
        </H1Title>
        {renderKeyValueFields(club)}
        {renderDescription(club)}
        <Spacer marginTop={4} marginLeft={2}>
          <UpcomingEvents
            events={club.events}
            showFirst={EVENTS_SHOW_FIRST}
            renderEvent={(event) => (
              <EventCard
                desktop={desktop}
                key={event.id}
                event={event}
                onClick={() => onEventClick({ id: event.id })}
                showDate
              />
            )}
          />
        </Spacer>
      </div>
    )
  }

  function renderDesktopContent(club: QueriedClub) {
    return (
      <div className={cn}>
        <H1Title>
          {club.name}
          {renderEditButton()}
        </H1Title>
        <div className={`${cn}__picture-and-short-info`}>
          {club.imageUrls && club.imageUrls.length > 0 && (
            <Carousel
              className={`${cn}__picture-wrapper`}
              imageCount={club.imageUrls.length}
              renderImage={(i) => (
                <img
                  className={`${cn}__picture`}
                  src={club.imageUrls![i]}
                  alt={`club ${club.name}`}
                />
              )}
            />
          )}
          {renderKeyValueFields(club)}
        </div>
        {renderDescription(club)}
        <Spacer marginTop={4} marginLeft={2}>
          <UpcomingEvents
            events={club.events}
            renderEvent={(event) => (
              <EventCard
                desktop={desktop}
                key={event.id}
                event={event}
                onClick={() => onEventClick({ id: event.id })}
                showDate
              />
            )}
            showFirst={EVENTS_SHOW_FIRST}
          />
        </Spacer>
      </div>
    )
  }

  return (
    <Page>
      <Header />
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        {desktop ? renderDesktopContent(club) : renderMobileContent(club)}
      </Content>
    </Page>
  )
}
