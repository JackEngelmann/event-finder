import React from 'react'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { ClubListContainer } from '../../components/ClubList/ClubListContainer'
import { useTranslation } from 'react-i18next'

export function ClubsPage() {
  const { t } = useTranslation()
  return (
    <Page>
      <HeaderContainer>{t('clubs')}</HeaderContainer>
      <Content scrollable restrictMaxWidth>
        <ClubListContainer />
      </Content>
    </Page>
  )
}
