import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
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
    const queryResult = useQuery<QueryResult>(QUERY)
    const clubs = queryResult.data && queryResult.data.clubs
    return [clubs, queryResult] as const
}