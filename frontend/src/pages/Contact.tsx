import React from 'react'
import { Page } from '../components/Page'
import { Header } from '../components/Header'
import { Content } from '../components/Content'
import { FooterContainer } from '../containers/FooterContainer'
import { GoBackButton } from '../components/GoBackButton'
import { useHistory } from 'react-router'
import { H1Title } from '../components/H1Title'

export function ContactPage() {
    const history = useHistory()
    return (
        <Page>
            <Header>
                <GoBackButton onClick={() => history.push('/')} />
            </Header>
            <Content restrictMaxWidth scrollable>
                <H1Title>Contact</H1Title>
                ...
            </Content>
            <FooterContainer />
        </Page>
    )
}
