import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
    {
        genres {
            id
            name
        }
    }
`

type QueryResult = {
    genres: {
        id: number
        name: string
    }[]
}

export function useGenres() {
    const queryResult = useQuery<QueryResult>(QUERY)
    const genres = queryResult.data && queryResult.data.genres
    return [genres, queryResult] as const
}