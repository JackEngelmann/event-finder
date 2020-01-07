import * as R from 'ramda'
import './AdminPage.scss'
import React from 'react'
import { Page } from '../../components/Page/Page'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Event } from '../../api'
import { EditableEntity } from '../../components/EditableEntity/EditableEntity'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { useHistory } from 'react-router'
import { useClubs, CLUBS_QUERY } from '../../components/utils/useClubs'
import { Button } from '../../components/Button/Button'
import { H1Title } from '../../components/H1Title/H1Title'
import { Icon } from '../../components/Icon/Icon'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { Content } from '../../components/Content/Content'
import moment from 'moment'
import { NetworkError } from '../../components/NetworkError'
import { useTranslation } from 'react-i18next'

const cn = 'admin-page'

const EVENTS_QUERY = gql`
  query AdminEventsQuery {
    events {
      id
      date
      name
    }
  }
`

const DELETE_EVENT_MUTATION = gql`
  mutation AdminDeleteEvent($id: Int!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

const DELETE_CLUB_MUTATION = gql`
  mutation AdminDeleteClub($id: Int!) {
    deleteClub(id: $id) {
      id
    }
  }
`

export function AdminPage() {
  const { t } = useTranslation()
  const [unsortedClubs, clubsQueryResult] = useClubs()
  const clubs = unsortedClubs
    ? R.sortBy(R.prop('name'), unsortedClubs)
    : undefined
  const eventsQueryResult = useQuery<{ events: Event[] }>(EVENTS_QUERY)
  const events =
    eventsQueryResult.data &&
    R.sortBy(R.prop('name'), eventsQueryResult.data.events)
  const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION)
  const [deleteClubMutation] = useMutation(DELETE_CLUB_MUTATION)
  const history = useHistory()

  if (eventsQueryResult.error) return <NetworkError />
  if (clubsQueryResult.error) return <NetworkError />

  function deleteEvent(id: number) {
    const isSure = window.confirm('Sure?')
    if (!isSure) return
    deleteEventMutation({
      variables: { id },
      refetchQueries: [{ query: EVENTS_QUERY }],
    })
  }

  function deleteClub(id: number) {
    const isSure = window.confirm('Sure?')
    if (!isSure) return
    deleteClubMutation({
      variables: { id },
      refetchQueries: [{ query: CLUBS_QUERY }],
    })
  }

  return (
    <Page>
      <HeaderContainer />
      <Content className={cn}>
        <H1Title>Administration</H1Title>
        <div className={`${cn}__content`}>
          <div className={`${cn}__section`}>
            <div className={`${cn}__section-header`}>
              <h2>{t('clubs')}</h2>
              <Button
                borderless
                secondary
                onClick={() => history.push('/admin/add-club')}
                data-cy="admin-create-club-button"
              >
                <Icon icon="plus" />
              </Button>
            </div>
            <div className={`${cn}__section-content`}>
              {clubs ? (
                clubs.map(c => (
                  <EditableEntity
                    key={c.id}
                    onShow={() => history.push(`/club/${c.id}`)}
                    onDelete={() => deleteClub(c.id)}
                    onEdit={() => history.push(`/admin/club/${c.id}`)}
                  >
                    {c.name}
                  </EditableEntity>
                ))
              ) : (
                <LoadingIndicator />
              )}
            </div>
          </div>
          <div className={`${cn}__section`}>
            <div className={`${cn}__section-header`}>
              <h2>{t('events')}</h2>
              <Button
                onClick={() => history.push('/admin/add-event')}
                secondary
                borderless
                data-cy="admin-create-event-button"
              >
                <Icon icon="plus" />
              </Button>
            </div>
            <div className={`${cn}__section-content`}>
              {events ? (
                events.map(e => (
                  <EditableEntity
                    key={e.id}
                    onDelete={() => deleteEvent(e.id)}
                    onShow={() => history.push(`/event/${e.id}`)}
                    onEdit={() => history.push(`/admin/event/${e.id}`)}
                  >
                    {e.name} ({moment(e.date).format('DD.MM.YYYY')})
                  </EditableEntity>
                ))
              ) : (
                <LoadingIndicator />
              )}
            </div>
          </div>
        </div>
      </Content>
    </Page>
  )
}
