import React, { ComponentProps, ReactNode } from 'react'
import { EventList } from '../../../components/EventList'
import { ShortenedListToggle } from '../../../components/ShortenedList/ShortenedListToggle'
import { ShortenedListContainer } from '../../../components/ShortenedList/ShortenedListContainer'
import { ShortenedListList } from '../../../components/ShortenedList/ShortenedListList'

type Props<Event> = {
  texts: {
    upcomingEvents: string
    noUpcomingEvents: string
    toggleShowAll: string
  }
  events: Event[]
  renderEvent: (event: Event) => ReactNode
  toggleShowAll: () => void
}

export function UpcomingEventsView<Event>(props: Props<Event>) {
  const { events, texts, renderEvent } = props
  return (
    <div>
      <h2>{texts.upcomingEvents}</h2>
      <ShortenedListContainer listLenght={events.length} showFirst={5}>
        <ShortenedListList
          items={events}
          renderList={(events) => (
            <EventList
              events={events}
              texts={{
                empty: texts.noUpcomingEvents,
              }}
              renderEvent={renderEvent}
            />
          )}
        />
        <ShortenedListToggle />
      </ShortenedListContainer>
    </div>
  )
}
