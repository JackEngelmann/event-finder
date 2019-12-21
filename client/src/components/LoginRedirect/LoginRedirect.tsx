import React from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { NetworkError } from '../NetworkError/NetworkError';

const ME_QUERY = gql`
    {
        me {
            id
        }
    }
`
export function LoginRedirect() {
    const meResult = useQuery(ME_QUERY)
    const me = meResult.data && meResult.data.me
    if (meResult.error) return <NetworkError />
    if (meResult.loading) return <LoadingIndicator />
    if (!me) return <Redirect to="/login" />
    return null
}