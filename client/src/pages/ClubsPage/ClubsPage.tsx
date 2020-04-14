import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { ClubListContainer } from '../../components/ClubList/ClubListContainer'
import { useTranslation } from 'react-i18next'
import { Header } from '../../components/Header'

export default function ClubsPage() {
  const { t } = useTranslation()
  return (
    <Page>
      <Header>{t('clubs')}</Header>
      <Content scrollable restrictMaxWidth>
        <ClubListContainer />
      </Content>
    </Page>
  )
}
