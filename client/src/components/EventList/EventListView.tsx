import React, { ReactNode } from 'react'
import './EventList.scss'

type Props<Event> = {
    events: Event[]
    renderEvent: (event: Event) => ReactNode
    texts: {
        noEventsToday: string
    }
}

const cn = 'event-list'

export function EventListView<Event>(props: Props<Event>) {
    const { events, renderEvent, texts } = props

    function renderContent() {
        if (events.length === 0) return texts.noEventsToday
        return events.map(renderEvent)
    }

    return <div className={cn}>{renderContent()}</div>
}
