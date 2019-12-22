import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { H1Title } from '../../components/H1Title/H1Title'
import { HeaderContainer } from '../../components/Header/HeaderContainer'
import { useTranslation } from 'react-i18next'
import { contact } from '../../contact'

export function ContactPage() {
  const { t } = useTranslation()
  return (
    <Page>
      <HeaderContainer />
      <Content restrictMaxWidth scrollable>
        <H1Title>{t('contact')}</H1Title>
        {t('email')}: {contact.email}
      </Content>
    </Page>
  )
}
