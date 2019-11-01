import React from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EventDetails } from "../components/EventDetails";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Event } from '../api';

type Props = {
    eventId: number | undefined
}

const QUERY = gql`
    query eventQuery($eventId: Int!) {
        event(id: $eventId) {
            id
            name
            description
            date
            imageUrl
            club {
                id
                name
            }
            genres {
                id
                name
            }
            priceCategory
            admissionFee
            admissionFeeWithDiscount
            minimumAge
            amountOfFloors
        }
    }
`

type QueryData = { event: Event }

export function EventDetailsContainer(props: Props) {
    const { eventId } = props;
    const queryResult = useQuery<QueryData>(QUERY, {
        variables: { eventId: eventId }
    })
    const event = queryResult.data && queryResult.data.event
    if (event === undefined) return <LoadingIndicator />
    return <EventDetails event={event} />
}