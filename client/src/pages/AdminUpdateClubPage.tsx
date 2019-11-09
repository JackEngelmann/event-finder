import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { ClubEditorState, ClubEditor } from '../components/ClubEditor'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useClubWithDetails } from '../containers/useClubWithDetails'
import { Button } from '../components/Button'
import { H1Title } from '../components/H1Title'
import { Spacer } from '../components/Spacer'

type Params = {
    clubId: string
}

const UPDATE_CLUB_MUTATION = gql`
    mutation UpdateClub($input: UpdateClubInput!) {
        updateClub(input: $input) {
            club {
                address
                contact
                description
                email
                id
                link
                name
                region
                specials
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
                id: parseInt(clubId),
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
        const clubId = createClubMutationResult.data.updateClub.club.id
        history.push(`/club/${clubId}`)
    }

    return (
        <Page>
            <Content restrictMaxWidth scrollable>
                <H1Title>Edit Club</H1Title>
                <ClubEditor
                    state={clubEditorState}
                    setState={setClubEditorState}
                />
                <Spacer />
                <Button primary disabled={!canSave} onClick={updateClub}>
                    Save
                </Button>
                <Button secondary onClick={() => history.push('/admin')}>
                    Cancel
                </Button>
                <Spacer />
            </Content>
        </Page>
    )
}
