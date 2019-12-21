import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { H1Title } from '../../components/H1Title/H1Title'
import { HeaderContainer } from '../../components/Header/HeaderContainer'

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
