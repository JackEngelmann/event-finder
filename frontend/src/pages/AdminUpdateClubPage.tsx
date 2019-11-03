import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { ClubEditorState, ClubEditor } from '../components/ClubEditor'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useClubWithDetails } from '../containers/useClubWithDetails'

type Params = {
    clubId: string
}

const UPDATE_CLUB_MUTATION = gql`
    mutation UpdateClub($input: UpdateClubInput!) {
        updateClub(input: $input) {
            club {
                id
            }
        }
    }
`

export function AdminUpdateClubPage() {
    const { clubId } = useParams<Params>()
    const [club] = useClubWithDetails(parseInt(clubId, 10))
    const [clubEditorState, setClubEditorState] = useState<ClubEditorState>({})
    useEffect(() => {
        if (!club) return
        setClubEditorState(club)
    }, [club])
    const canSave = Boolean(clubEditorState.name && clubEditorState.id)
    const [updateClubMutation] = useMutation(UPDATE_CLUB_MUTATION, {
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

    async function updateClub() {
        const createClubMutationResult = await updateClubMutation()
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
                <button disabled={!canSave} onClick={updateClub}>
                    Save
                </button>
            </Content>
        </Page>
    )
}
