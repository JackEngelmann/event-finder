import './ClubDetailPage.scss'
import React from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useParams, useHistory } from 'react-router'
import { GoBackButton } from '../components/GoBackButton'
import { OnlyVisibleForAdmins } from '../containers/OnlyVisibleForAdmins'
import { Button } from '../components/Button'
import { HeaderContainer } from '../containers/HeaderContainer'
import gql from 'graphql-tag'
import { Club } from '../api'
import { useQuery } from '@apollo/react-hooks'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { H1Title } from '../components/H1Title'
import { KeyValueFields } from '../components/KeyValueFields'
import { KeyValueField } from '../components/KeyValueField'
import { LinkRenderer } from '../components/LinkRenderer'
import { TextWithLineBreaks } from '../components/TextWithLineBreaks'
import { Icon } from '../components/Icon'

type Props = {}

type Params = {
    clubId: string
}

const cn = 'club-detail-page'

const CLUB_QUERY = gql`
    query clubQuery($clubId: Int!) {
        club(id: $clubId) {
            address
            contact
            description
            email
            id
            imageUrl
            link
            name
            region
            specials
        }
    }
`
type ClubQueryData = {
    club: Pick<
        Club,
        | 'id'
        | 'name'
        | 'address'
        | 'region'
        | 'contact'
        | 'email'
        | 'specials'
        | 'description'
        | 'link'
        | 'imageUrl'
    >
}

export function ClubDetailPage(props: Props) {
    const params = useParams<Params>()
    const history = useHistory()
    const clubId = parseInt(params.clubId)
    const clubQueryResult = useQuery<ClubQueryData>(CLUB_QUERY, {
        variables: { clubId },
    })
    const club = clubQueryResult.data && clubQueryResult.data.club
    if (!club) return <LoadingIndicator />

    return (
        <Page>
            <HeaderContainer
                left={<GoBackButton onClick={() => history.push('/')} />}
            />
            <Content restrictMaxWidth scrollable>
                <div className={cn}>
                    <H1Title>
                        {club.name}
                        <OnlyVisibleForAdmins>
                            <Button
                                className={`${cn}__edit-button`}
                                onClick={() =>
                                    history.push(`/admin/club/${clubId}`)
                                }
                            >
                                <Icon icon="pen" />
                            </Button>
                        </OnlyVisibleForAdmins>
                    </H1Title>
                    <div className={`${cn}__picture-and-short-info`}>
                        <div className={`${cn}__picture-wrapper`}>
                            <img
                                className={`${cn}__picture`}
                                src={club.imageUrl}
                                alt={`club ${club.name}`}
                            />
                        </div>
                        <KeyValueFields>
                            <KeyValueField
                                fieldKey="Adress"
                                fieldValue={club.address}
                            />
                            <KeyValueField
                                fieldKey="Region"
                                fieldValue={club.region}
                            />
                            <KeyValueField
                                fieldKey="Contact"
                                fieldValue={club.contact}
                            />
                            <KeyValueField
                                fieldKey="Email"
                                fieldValue={club.email}
                            />
                            <KeyValueField
                                fieldKey="Specials"
                                fieldValue={club.specials}
                            />
                            <KeyValueField
                                fieldKey="Link"
                                fieldValue={
                                    club.link && (
                                        <LinkRenderer href={club.link} />
                                    )
                                }
                            />
                        </KeyValueFields>
                    </div>
                    <section>
                        <TextWithLineBreaks text={club.description || ''} />
                    </section>
                </div>
            </Content>
        </Page>
    )
}
