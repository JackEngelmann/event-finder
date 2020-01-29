import './ClubDetailPage.scss'
import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { useParams, useHistory } from 'react-router'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Button } from '../../components/Button/Button'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
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
import { EventList } from '../../components/EventList'
import moment from 'moment'
import { EventCard } from '../../components/EventCard/EventCard'

type Props = {}

type Params = {
  clubId: string
}

const cn = 'club-detail-page'

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
      link
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
  link?: string
  name: string
  region?: string
  specials?: string
}
type ClubQueryData = {
  club: QueriedClub
}

export const today = moment()

export function ClubDetailPage(props: Props) {
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
            club.link && (
              <LinkRenderer href={club.link} text={t('linkToClub')} />
            )
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

  function renderUpcomingEvents(club: QueriedClub) {
    return (
      <div>
        <h2>{t('upcomingEvents')}</h2>
        <EventList
          events={club.events}
          texts={{
            empty: t('noUpcomingEvents'),
          }}
          renderEvent={event => (
            <EventCard
              desktop={desktop}
              key={event.id}
              event={event}
              onClick={() => onEventClick({ id: event.id })}
              showDate
            />
          )}
        />
      </div>
    )
  }

  function renderMobileContent(club: QueriedClub) {
    return (
      <div className={cn}>
        {club.imageUrls && club.imageUrls.length > 0 && (
          <Carousel
            className={`${cn}__carousel`}
            imageCount={club.imageUrls.length}
            renderImage={i => (
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
        {renderUpcomingEvents(club)}
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
              renderImage={i => (
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
        {renderUpcomingEvents(club)}
      </div>
    )
  }

  return (
    <Page>
      <HeaderContainer />
      <Content restrictMaxWidth scrollable className={`${cn}__content`}>
        {desktop ? renderDesktopContent(club) : renderMobileContent(club)}
      </Content>
    </Page>
  )
}
