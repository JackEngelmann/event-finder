import React from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { LoadingIndicator } from "../components/LoadingIndicator";

const ME_Query = gql`
    {
        me {
            id
        }
    }
`
export function LoginRedirect() {
    const meResult = useQuery(ME_Query)
    const me = meResult.data && meResult.data.me
    if (meResult.loading) return <LoadingIndicator />
    if (!me) return <Redirect to="/login" />
    return null
}