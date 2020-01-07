import moment, { Moment } from 'moment'

export function getWeeksInMonth(year: number, month: number) {
  const firstDayOfFirstWeek = moment()
    .year(year)
    .month(month)
    .startOf('month')
    .startOf('week')
  const daysInWeeks: Moment[][] = []
  let day: Moment = moment(firstDayOfFirstWeek)
  const lastDayOfLastWeek = moment()
    .year(year)
    .month(month)
    .endOf('month')
    .endOf('week')
  while (true) {
    const isFirstDayOfWeek = day.weekday() === 0
    if (day.isAfter(lastDayOfLastWeek)) break
    if (isFirstDayOfWeek) {
      daysInWeeks.push([day])
    } else {
      const lastWeek = daysInWeeks[daysInWeeks.length - 1]
      lastWeek.push(day)
    }
    day = moment(day).add(1, 'day')
  }
  return daysInWeeks
}
