import React, { ReactNode } from 'react'
import './EventList.scss'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'

type Props<Event> = {
  events: Event[] | undefined
  renderEvent: (event: Event) => ReactNode
  texts: {
    empty: string
  }
}

const cn = 'event-list'

export function EventListView<Event>(props: Props<Event>) {
  const { events, renderEvent, texts } = props

  if (events === undefined) return <LoadingIndicator />

  return (
    <div className={cn}>
      {events.length === 0 && texts.empty}
      {events.map(renderEvent)}
    </div>
  )
}
