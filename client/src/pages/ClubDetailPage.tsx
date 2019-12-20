import './ClubDetailPage.scss'
import React from 'react'
import { Page } from '../components/Page'
import { Content } from '../components/Content'
import { useParams, useHistory } from 'react-router'
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
import { useDimensions } from '../containers/useDimensions'
import { NetworkError } from '../components/NetworkError'

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
            imageUrls
            link
            name
            region
            specials
        }
    }
`

type QueriedClub = Pick<
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
    | 'imageUrls'
>
type ClubQueryData = {
    club: QueriedClub
}

export function ClubDetailPage(props: Props) {
    const params = useParams<Params>()
    const history = useHistory()
    const clubId = parseInt(params.clubId)
    const dimensions = useDimensions()
    const desktop = Boolean(dimensions.width && dimensions.width > 800)
    const clubQueryResult = useQuery<ClubQueryData>(CLUB_QUERY, {
        variables: { clubId },
    })
    const club = clubQueryResult.data && clubQueryResult.data.club
    if (clubQueryResult.error) return <NetworkError />
    if (!club) return <LoadingIndicator />

    function renderDescription(club: QueriedClub) {
        return (
            <section>
                <TextWithLineBreaks text={club.description || ''} />
            </section>
        )
    }

    function renderKeyValueFields(club: QueriedClub) {
        return (
            <KeyValueFields>
                <KeyValueField fieldKey="Adress" fieldValue={club.address} />
                <KeyValueField fieldKey="Region" fieldValue={club.region} />
                <KeyValueField fieldKey="Contact" fieldValue={club.contact} />
                <KeyValueField fieldKey="Email" fieldValue={club.email} />
                <KeyValueField fieldKey="Specials" fieldValue={club.specials} />
                <KeyValueField
                    fieldKey="Link"
                    fieldValue={club.link && <LinkRenderer href={club.link} />}
                />
            </KeyValueFields>
        )
    }

    function renderEditButton() {
        return (
            <OnlyVisibleForAdmins>
                <Button
                    className={`${cn}__edit-button`}
                    onClick={() => history.push(`/admin/club/${clubId}`)}
                >
                    <Icon icon="pen" />
                </Button>
            </OnlyVisibleForAdmins>
        )
    }

    function renderMobileContent(club: QueriedClub) {
        return (
            <div className={cn}>
                {club.imageUrls && (
                    <div className={`${cn}__picture-wrapper`}>
                        <img
                            className={`${cn}__picture`}
                            src={club.imageUrls[0]}
                            alt={`club ${club.name}`}
                        />
                    </div>
                )}
                <H1Title hideDivider>
                    {club.name}
                    {renderEditButton()}
                </H1Title>
                {renderKeyValueFields(club)}
                {renderDescription(club)}
            </div>
        )
    }

    function renderDesktopContent(club: QueriedClub) {
        return (
            <div className={cn}>
                <H1Title>
                    {club.name}
                    {renderEditButton()}
                </H1Title>
                <div className={`${cn}__picture-and-short-info`}>
                    {club.imageUrls && (
                        <div className={`${cn}__picture-wrapper`}>
                            <img
                                className={`${cn}__picture`}
                                src={club.imageUrls[0]}
                                alt={`club ${club.name}`}
                            />
                        </div>
                    )}
                    {renderKeyValueFields(club)}
                </div>
                {renderDescription(club)}
            </div>
        )
    }

    return (
        <Page>
            <HeaderContainer />
            <Content restrictMaxWidth scrollable>
                {desktop
                    ? renderDesktopContent(club)
                    : renderMobileContent(club)}
            </Content>
        </Page>
    )
}
