import React from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { H1Title } from '../components/H1Title'
import { HeaderContainer } from '../containers/HeaderContainer'

export function ContactPage() {
    return (
        <Page>
            <HeaderContainer />
            <Content restrictMaxWidth scrollable>
                <H1Title>Contact</H1Title>
                Email: info@event-jaf.de
            </Content>
        </Page>
    )
}
