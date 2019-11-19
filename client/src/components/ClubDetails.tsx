import React from 'react';
import { H1Title } from './H1Title';
import { KeyValueFields } from './KeyValueFields';
import { KeyValueField } from './KeyValueField';
import { TextWithLineBreaks } from './TextWithLineBreaks';
import './ClubDetails.scss'

type Props = {
    club: {
        address?: string
        contact?: string
        description?: string
        email?: string
        link?: string
        name: string
        region?: string
        specials?: string
    }
}

const cn = 'club-details'

export function ClubDetails(props: Props) {
    const { club } = props;
    return (
        <div className={cn}>
            <H1Title>{club.name}</H1Title>
            <KeyValueFields>
                <KeyValueField fieldKey="Adress" fieldValue={club.address} />
                <KeyValueField fieldKey="Region" fieldValue={club.region} />
                <KeyValueField fieldKey="Contact" fieldValue={club.contact} />
                <KeyValueField fieldKey="Email" fieldValue={club.email} />
                <KeyValueField fieldKey="Specials" fieldValue={club.specials} />
                <KeyValueField fieldKey="Link" fieldValue={club.link} />
            </KeyValueFields>
            <section>
                <TextWithLineBreaks text={club.description || ''} />
            </section>
        </div>
    )
}