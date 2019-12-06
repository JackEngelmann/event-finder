import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router'
import { GoBackButton } from '../components/GoBackButton'
import { Page } from '../components/Page'
import { EventDetailsContainer } from '../containers/EventDetailsContainer'
import { Content } from '../components/Content'
import { OnlyVisibleForAdmins } from '../containers/OnlyVisibleForAdmins'
import { Button } from '../components/Button'
import { HeaderContainer } from '../containers/HeaderContainer'

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
            <HeaderContainer
                left={
                    <GoBackButton
                        onClick={() => history.push(`/event/${search}`)}
                    />
                }
            />
            <Content restrictMaxWidth scrollable>
                <EventDetailsContainer
                    eventId={eventId ? parseInt(eventId, 10) : undefined}
                />
                <OnlyVisibleForAdmins>
                    <Button
                        onClick={() => history.push(`/admin/event/${eventId}`)}
                    >
                        Edit
                    </Button>
                </OnlyVisibleForAdmins>
            </Content>
        </Page>
    )
}
