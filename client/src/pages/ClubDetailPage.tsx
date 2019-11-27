import React from 'react'
import { Page } from '../components/Page'
import { Header } from '../components/Header'
import { Content } from '../components/Content'
import { useParams, useHistory } from 'react-router'
import { GoBackButton } from '../components/GoBackButton'
import { ClubDetailsContainer } from '../containers/ClubDetailsContainer'
import { OnlyVisibleForAdmins } from '../containers/OnlyVisibleForAdmins'
import { Button } from '../components/Button'
import { HeaderContainer } from '../containers/HeaderContainer'

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
            <HeaderContainer>
                <GoBackButton onClick={() => history.push('/')} />
            </HeaderContainer>
            <Content restrictMaxWidth scrollable>
                <ClubDetailsContainer clubId={clubId} />
                <OnlyVisibleForAdmins>
                    <Button
                        onClick={() => history.push(`/admin/club/${clubId}`)}
                    >
                        Edit
                    </Button>
                </OnlyVisibleForAdmins>
            </Content>
        </Page>
    )
}
