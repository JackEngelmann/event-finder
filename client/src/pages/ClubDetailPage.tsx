import React from 'react'
import { Page } from '../components/Page'
import { Header } from '../components/Header'
import { Content } from '../components/Content'
import { useParams, useHistory } from 'react-router'
import gql from 'graphql-tag'
import { Club } from '../api'
import { useQuery } from '@apollo/react-hooks'
import { GoBackButton } from '../components/GoBackButton'
import { FormattedHtml } from '../components/FormattedHtml'
import { H1Title } from '../components/H1Title'
import { KeyValueField } from '../components/KeyValueField'
import { KeyValueFields } from '../components/KeyValueFields'
import { LoadingIndicator } from '../components/LoadingIndicator'

type Props = {}

type Params = {
    clubId: string
}

const CLUB_QUERY = gql`
    query clubQuery($clubId: Int!) {
        club(id: $clubId) {
            id
            name
            address
            region
            contact
            email
            specials
            description
            link
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
    >
}

export function ClubDetailPage(props: Props) {
    const params = useParams<Params>()
    const { clubId } = params
    const clubQueryResult = useQuery<ClubQueryData>(CLUB_QUERY, {
        variables: { clubId: parseInt(clubId, 10) },
    })
    const history = useHistory()
    const club = clubQueryResult.data && clubQueryResult.data.club

    return (
        <Page>
            <Header>
                <GoBackButton onClick={() => history.push('/')} />
            </Header>
            <Content restrictMaxWidth scrollable>
                {club ? (
                    <>
                        <H1Title>{club.name}</H1Title>
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
                                fieldValue={club.link}
                            />
                        </KeyValueFields>
                        <FormattedHtml>{club.description}</FormattedHtml>
                    </>
                ) : (
                    <LoadingIndicator />
                )}
            </Content>
        </Page>
    )
}
