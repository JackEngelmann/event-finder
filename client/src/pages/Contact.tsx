import React from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { GoBackButton } from '../components/GoBackButton'
import { useHistory } from 'react-router'
import { H1Title } from '../components/H1Title'
import { HeaderContainer } from '../containers/HeaderContainer'

export function ContactPage() {
    const history = useHistory()
    return (
        <Page>
            <HeaderContainer
                left={<GoBackButton onClick={() => history.push('/')} />}
            />
            <Content restrictMaxWidth scrollable>
                <H1Title>Contact</H1Title>
                Email: info@event-jaf.de
            </Content>
        </Page>
    )
}
