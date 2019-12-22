import React, { useState } from 'react'
import gql from 'graphql-tag'
import {
  ClubEditorState,
  ClubEditor,
} from '../../components/ClubEditor/ClubEditor'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'
import { Button } from '../../components/Button/Button'
import { H1Title } from '../../components/H1Title/H1Title'
import { Spacer } from '../../components/Spacer/Spacer'
import { CLUBS_QUERY } from '../../components/utils/useClubs'
import { useTranslation } from 'react-i18next'

const CREATE_CLUB_MUTATION = gql`
  mutation CreateClub($input: CreateClubInput!) {
    createClub(input: $input) {
      club {
        id
      }
    }
  }
`

export function AdminAddClubPage() {
  const { t } = useTranslation()
  const [clubEditorState, setClubEditorState] = useState<ClubEditorState>({})
  const [requestPending, setRequestPending] = useState(false)
  const canCreate = Boolean(clubEditorState.name) && !requestPending
  const [createClubMutation] = useMutation(CREATE_CLUB_MUTATION, {
    variables: {
      input: {
        address: clubEditorState.address,
        contact: clubEditorState.contact,
        description: clubEditorState.description,
        email: clubEditorState.email,
        link: clubEditorState.link,
        imageUrls: clubEditorState.imageUrls,
        name: clubEditorState.name,
        region: clubEditorState.region,
        specials: clubEditorState.specials,
      },
    },
    refetchQueries: [{ query: CLUBS_QUERY }],
  })
  const history = useHistory()

  async function createClub() {
    setRequestPending(true)
    const createClubMutationResult = await createClubMutation()
    const clubId = createClubMutationResult.data.createClub.club.id
    history.push(`/club/${clubId}`)
  }

  return (
    <Page>
      <Content restrictMaxWidth scrollable>
        <H1Title>{t('createClub')}</H1Title>
        <ClubEditor state={clubEditorState} setState={setClubEditorState} />
        <Spacer />
        <Button primary disabled={!canCreate} onClick={createClub}>
          {t('create')}
        </Button>
        <Button secondary onClick={() => history.push('/admin')}>
          {t('cancel')}
        </Button>
        <Spacer />
      </Content>
    </Page>
  )
}
