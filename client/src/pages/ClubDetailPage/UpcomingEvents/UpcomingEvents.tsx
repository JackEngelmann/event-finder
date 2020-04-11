import * as R from 'ramda'
import React, { ComponentProps, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { UpcomingEventsView } from './UpcomingEventsView'
import { apply } from 'ramda'

type Props<Event> = {
  events: Event[]
  renderEvent: (event: Event) => ReactNode
  showFirst?: number
}

type EventWithDate = {
  date: string
}

export function UpcomingEvents<Event extends EventWithDate>(
  props: Props<Event>
) {
  const { renderEvent, showFirst, events } = props
  const [showAll, setShowAll] = useState(false)
  const shownEvents = applyShowFirst(events, showFirst, showAll)
  const sortedEvents = sortEventsByDate(shownEvents)
  const { t } = useTranslation()
  const texts = {
    upcomingEvents: t('upcomingEvents'),
    noUpcomingEvents: t('noUpcomingEvents'),
    toggleShowAll: showAll ? t('showLess') : t('showMore'),
  }
  return (
    <UpcomingEventsView
      events={sortedEvents}
      texts={texts}
      renderEvent={renderEvent}
      toggleShowAll={() => setShowAll(showAll => !showAll)}
    />
  )
}

const sortEventsByDate = R.sortBy((event: EventWithDate) =>
  moment(event.date).unix()
)

function applyShowFirst<ListItem>(
  list: ListItem[],
  showFirst?: number,
  showAll?: boolean
) {
  if (showFirst === undefined || showAll) {
    return list
  }
  console.log(showFirst)
  return R.take(showFirst, list)
}
