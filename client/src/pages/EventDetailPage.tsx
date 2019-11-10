import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router'
import { Header } from '../components/Header'
import { GoBackButton } from '../components/GoBackButton'
import { Page } from '../components/Page'
import { EventDetailsContainer } from '../containers/EventDetailsContainer'
import { Content } from '../components/Content'

type Props = {}

type Params = {
    eventId: string
}


export function EventDetailPage(props: Props) {
    const params = useParams<Params>()
    const { eventId } = params
    const history = useHistory()
    const search = useLocation().search

    return (
        <Page>
            <Header>
                <GoBackButton onClick={() => history.push(`/${search}`)} />
            </Header>
            <Content restrictMaxWidth scrollable>
                <EventDetailsContainer
                    eventId={eventId ? parseInt(eventId, 10) : undefined}
                />
            </Content>
        </Page>
    )
}