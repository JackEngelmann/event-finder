import './AdminPage.scss'
import React from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Club, Event } from '../api'
import { EditableEntity } from '../components/EditableEntity'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useHistory } from 'react-router'
import { useClubs } from '../containers/useClubs'

const cn = 'admin-page'

// TODO: permission system!

const EVENTS_QUERY = gql`
    query AdminEventsQuery {
        events {
            id
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

export function AdminPage() {
    const clubs = useClubs()[0] || []
    const eventsQueryResult = useQuery<{ events: Event[] }>(EVENTS_QUERY)
    const events = eventsQueryResult.data && eventsQueryResult.data.events
    const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION)
    const history = useHistory()

    function deleteEvent(id: number) {
        deleteEventMutation({
            variables: { id },
            refetchQueries: [{ query: EVENTS_QUERY }],
        })
    }

    return (
        <Page>
            <Content scrollable restrictMaxWidth>
                <div className={cn}>
                    <div className={`${cn}__column`}>
                        <div className={`${cn}__column-header`}>Clubs</div>
                        <div className={`${cn}__column-content`}>
                            {clubs ? (
                                clubs.map(c => (
                                    <EditableEntity key={c.id}>
                                        {c.name}
                                    </EditableEntity>
                                ))
                            ) : (
                                <LoadingIndicator />
                            )}
                        </div>
                    </div>
                    <div className={`${cn}__column`}>
                        <div className={`${cn}__column-header`}>
                            Events{' '}
                            <button
                                onClick={() => history.push('/admin/add-event')}
                            >
                                Create Event
                            </button>
                        </div>
                        <div className={`${cn}__column-content`}>
                            {events ? (
                                events.map(e => (
                                    <EditableEntity
                                        key={e.id}
                                        onDelete={() => deleteEvent(e.id)}
                                        onEdit={() => history.push(`/admin/event/${e.id}`)}
                                    >
                                        {e.name}
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
