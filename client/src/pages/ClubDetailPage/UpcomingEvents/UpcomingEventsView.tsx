import React, { ReactNode } from 'react'
import { EventList } from '../../../components/EventList'
import { ShortenedListToggle } from '../../../components/ShortenedList/ShortenedListToggle'
import { ShortenedListContainer } from '../../../components/ShortenedList/ShortenedListContainer'
import { ShortenedListList } from '../../../components/ShortenedList/ShortenedListList'
import { Spacer } from '../../../components/Layouting/Spacer'
import { Text } from '../../../components/Layouting/Text'

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
      <h2>
        <Text size={2}>{texts.upcomingEvents}</Text>
      </h2>
      <Spacer marginBottom={3} />
      <ShortenedListContainer listLenght={events.length} showFirst={1}>
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
