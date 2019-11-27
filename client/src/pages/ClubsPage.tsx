import React from 'react';
import { HeaderContainer } from '../containers/HeaderContainer';
import { Page } from '../components/Page';
import { Content } from '../components/Content';
import { ClubListContainer } from '../containers/ClubListContainer';

export function ClubsPage() {
    return (
        <Page>
            <HeaderContainer>
                Clubs
            </HeaderContainer>
            <Content scrollable restrictMaxWidth>
                <ClubListContainer />
            </Content>
        </Page>
    )
}