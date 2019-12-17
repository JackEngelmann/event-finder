import React from 'react';
import { ComponentProps } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { NetworkError } from '../components/NetworkError';

type Props = ComponentProps<'div'>

const ME_QUERY = gql`
    {
        me {
            id
        }
    }
`

export function OnlyVisibleForAdmins(props: Props) {
    const meResult = useQuery(ME_QUERY)
    const me = meResult.data && meResult.data.me
    if (meResult.error) return <NetworkError />
    if (meResult.loading) return null
    if (!me) return null
    return <>{props.children}</>
}