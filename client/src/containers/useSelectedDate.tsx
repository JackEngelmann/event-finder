import { useHistory, useLocation } from "react-router"
import { useUrlSearchParams } from "./useUrlSearchParams"
import moment, { Moment } from "moment";

export function queryStringFromSelectedDate(date: Moment) {
  return date.toISOString()
}

function selectedDateFromQueryString(queryString: string | null) {
  if (!queryString) return undefined;
  return moment(queryString)
}

export function useSelectedDate() {
  const query = useUrlSearchParams()
  const selectedDate = selectedDateFromQueryString(query.get('date'))
  const history = useHistory()
  const pathname = useLocation().pathname
  const setSelectedDate = (date: moment.Moment) => {
    history.push(`${pathname}?date=${queryStringFromSelectedDate(date)}`)
  }
  return [selectedDate, setSelectedDate] as const
}
