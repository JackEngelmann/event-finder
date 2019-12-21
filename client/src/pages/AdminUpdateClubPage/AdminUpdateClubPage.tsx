import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { ClubEditorState, ClubEditor } from '../../components/ClubEditor/ClubEditor'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router'
import { Page } from '../../components/Page/Page'
import { Content } from '../../components/Content/Content'
import './AdminUpdateClubPage.scss'
import { useClubWithDetails } from '../../components/utils/useClubWithDetails'
import { Button } from '../../components/Button/Button'
import { H1Title } from '../../components/H1Title/H1Title'
import { Spacer } from '../../components/Spacer/Spacer'
import { CLUBS_QUERY } from '../../components/utils/useClubs'

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
                imageUrls
                link
                name
                region
                specials
            }
        }
    }
`

const cn = 'admin-update-club-page'

export function AdminUpdateClubPage() {
    const { clubId } = useParams<Params>()
    const [requestPending, setRequestPending] = useState(false)
    const [club] = useClubWithDetails(parseInt(clubId, 10))
    const [clubEditorState, setClubEditorState] = useState<ClubEditorState>({})
    useEffect(() => {
        if (!club) return
        setClubEditorState(club)
    }, [club])
    const canSave = Boolean(clubEditorState.name && clubEditorState.id) && !requestPending
    const [updateClubMutation] = useMutation(UPDATE_CLUB_MUTATION, {
        variables: {
            input: {
                address: clubEditorState.address,
                contact: clubEditorState.contact,
                description: clubEditorState.description,
                email: clubEditorState.email,
                id: parseInt(clubId),
                imageUrls: clubEditorState.imageUrls,
                link: clubEditorState.link,
                name: clubEditorState.name,
                region: clubEditorState.region,
                specials: clubEditorState.specials
            }
        },
        refetchQueries: [{ query: CLUBS_QUERY }]
    })
    const history = useHistory()

    async function updateClub() {
        setRequestPending(true)
        const createClubMutationResult = await updateClubMutation()
        const clubId = createClubMutationResult.data.updateClub.club.id
        history.push(`/club/${clubId}`)
    }

    return (
        <Page>
            <Content restrictMaxWidth scrollable className={`${cn}__content`}>
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
