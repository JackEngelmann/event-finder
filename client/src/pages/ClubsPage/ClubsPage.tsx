import React from 'react';
import { HeaderContainer } from '../../components/Header/HeaderContainer';
import { Page } from '../../components/Page/Page';
import { Content } from '../../components/Content/Content';
import { ClubListContainer } from '../../components/ClubList/ClubListContainer';

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