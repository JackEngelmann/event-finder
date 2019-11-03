import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const CLUBS_QUERY = gql`
    {
        clubs {
            id
            name
        }
    }
`
type QueryResult = {
    clubs: {
        id: number
        name: string
    }[]
}

export function useClubs() {
    const queryResult = useQuery<QueryResult>(CLUBS_QUERY)
    const clubs = queryResult.data && queryResult.data.clubs
    return [clubs, queryResult] as const
}