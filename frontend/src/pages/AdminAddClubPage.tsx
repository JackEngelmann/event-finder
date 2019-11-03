import React, { useState } from 'react'
import gql from 'graphql-tag'
import { ClubEditorState, ClubEditor } from '../components/ClubEditor'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router'

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
                name: clubEditorState.name,
                region: clubEditorState.region,
                specials: clubEditorState.specials
            }
        }
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
                <ClubEditor
                    state={clubEditorState}
                    setState={setClubEditorState}
                />
                <button disabled={!canCreate} onClick={createClub}>
                    Create
                </button>
            </Content>
        </Page>
    )
}
