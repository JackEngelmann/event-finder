import React from 'react'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { H1Title } from '../../components/H1Title/H1Title'
import { useTranslation } from 'react-i18next'
import { contact } from '../../contact'
import { Header } from '../../components/Header'

export default function ContactPage() {
  const { t } = useTranslation()
  return (
    <Page>
      <Header />
      <Content restrictMaxWidth scrollable>
        <H1Title>{t('contact')}</H1Title>
        {t('email')}: {contact.email}
      </Content>
    </Page>
  )
}
