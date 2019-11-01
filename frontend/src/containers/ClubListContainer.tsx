import React from 'react';
import { ClubList } from "../components/ClubList";
import gql from "graphql-tag";
import { Club } from "../api";
import { useQuery } from "@apollo/react-hooks";
import { ClubListItem } from "../components/ClubListItem";
import { useHistory } from 'react-router';

const CLUBS_QUERY = gql`
  {
    clubs {
      id
      name
    }
  }
`
type ClubsQueryData = {
  clubs: Club[]
}

export function ClubListContainer() {
    const clubsQueryResult = useQuery<ClubsQueryData>(CLUBS_QUERY)
    const clubs = (clubsQueryResult.data && clubsQueryResult.data.clubs) || []
    const history = useHistory()
    return (
        <ClubList
          clubs={clubs}
          renderClub={club => (
            <ClubListItem
              key={club.name}
              club={club}
              onClick={() => history.push(`/club/${club.id}`)}
            />
          )}
          showFirst={15}
        />
    )
}