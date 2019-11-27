import React from 'react'
import { Page } from '../components/Page'
import { Header } from '../components/Header'
import { Content } from '../components/Content'
import { GoBackButton } from '../components/GoBackButton'
import { useHistory } from 'react-router'
import { H1Title } from '../components/H1Title'
import { HeaderContainer } from '../containers/HeaderContainer'

export function ContactPage() {
    const history = useHistory()
    return (
        <Page>
            <HeaderContainer>
                <GoBackButton onClick={() => history.push('/')} />
            </HeaderContainer>
            <Content restrictMaxWidth scrollable>
                <H1Title>Contact</H1Title>
                ...
            </Content>
        </Page>
    )
}
