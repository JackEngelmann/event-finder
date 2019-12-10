import React, { useState } from 'react'
import gql from 'graphql-tag'
import { ClubEditorState, ClubEditor } from '../components/ClubEditor'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'
import { Button } from '../components/Button'
import { H1Title } from '../components/H1Title'
import { Spacer } from '../components/Spacer'
import { CLUBS_QUERY } from '../containers/useClubs'

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
    const [clubEditorState, setClubEditorState] = useState<ClubEditorState>({})
    const canCreate = Boolean(clubEditorState.name)
    const [createClubMutation] = useMutation(CREATE_CLUB_MUTATION, {
        variables: {
            input: {
                address: clubEditorState.address,
                contact: clubEditorState.contact,
                description: clubEditorState.description,
                email: clubEditorState.email,
                link: clubEditorState.link,
                image: clubEditorState.image,
                name: clubEditorState.name,
                region: clubEditorState.region,
                specials: clubEditorState.specials
            }
        },
        refetchQueries: [{ query: CLUBS_QUERY }]
    })
    const history = useHistory()

    async function createClub() {
        const createClubMutationResult = await createClubMutation()
        const clubId = createClubMutationResult.data.createClub.club.id
        history.push(`/club/${clubId}`)
    }

    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <H1Title>Create Club</H1Title>
                <ClubEditor
                    state={clubEditorState}
                    setState={setClubEditorState}
                />
                <Spacer />
                <Button primary disabled={!canCreate} onClick={createClub}>
                    Create
                </Button>
                <Button secondary onClick={() => history.push('/admin')}>
                    Cancel
                </Button>
                <Spacer />
            </Content>
        </Page>
    )
}
