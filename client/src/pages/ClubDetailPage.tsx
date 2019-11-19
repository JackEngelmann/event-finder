import React from 'react'
import { Page } from '../components/Page'
import { Header } from '../components/Header'
import { Content } from '../components/Content'
import { useParams, useHistory } from 'react-router'
import { GoBackButton } from '../components/GoBackButton'
import { ClubDetailsContainer } from '../containers/ClubDetailsContainer'

type Props = {}

type Params = {
    clubId: string
}

export function ClubDetailPage(props: Props) {
    const params = useParams<Params>()
    const history = useHistory()
    const clubId = parseInt(params.clubId)

    return (
        <Page>
            <Header>
                <GoBackButton onClick={() => history.push('/')} />
            </Header>
            <Content restrictMaxWidth scrollable>
                <ClubDetailsContainer clubId={clubId} />
            </Content>
        </Page>
    )
}
