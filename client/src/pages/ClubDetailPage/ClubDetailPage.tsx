import './ClubDetailPage.scss'
import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { useParams, useHistory } from 'react-router'
import { OnlyVisibleForAdmins } from '../../components/OnlyVisibleForAdmins/OnlyVisibleForAdmins'
import { Button } from '../../components/Button/Button'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import gql from 'graphql-tag'
import { Club } from '../../api'
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

type Props = {}

type Params = {
  clubId: string
}

const cn = 'club-detail-page'

const CLUB_QUERY = gql`
  query clubQuery($clubId: Int!) {
    club(id: $clubId) {
      address
      contact
      description
      email
      id
      imageUrls
      link
      name
      region
      specials
    }
  }
`

type QueriedClub = Pick<
  Club,
  | 'id'
  | 'name'
  | 'address'
  | 'region'
  | 'contact'
  | 'email'
  | 'specials'
  | 'description'
  | 'link'
  | 'imageUrls'
>
type ClubQueryData = {
  club: QueriedClub
}

export function ClubDetailPage(props: Props) {
  const params = useParams<Params>()
  const { t } = useTranslation()
  const history = useHistory()
  const clubId = parseInt(params.clubId)
  const dimensions = useDimensions()
  const desktop = Boolean(dimensions.width && dimensions.width > 800)
  const clubQueryResult = useQuery<ClubQueryData>(CLUB_QUERY, {
    variables: { clubId },
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
        <KeyValueField fieldKey={t('adress')} fieldValue={club.address} />
        <KeyValueField fieldKey={t('region')} fieldValue={club.region} />
        <KeyValueField fieldKey={t('contact')} fieldValue={club.contact} />
        <KeyValueField fieldKey={t('email')} fieldValue={club.email} />
        <KeyValueField fieldKey={t('specials')} fieldValue={club.specials} />
        <KeyValueField
          fieldKey={t('link')}
          fieldValue={club.link && <LinkRenderer href={club.link} />}
        />
      </KeyValueFields>
    )
  }

  function renderEditButton() {
    return (
      <OnlyVisibleForAdmins>
        <Button
          className={`${cn}__edit-button`}
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
