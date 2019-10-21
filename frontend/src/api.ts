import { useEffect, useState } from "react";

export type Club = {
    name: string
}

export type Event = {
    id: string
    name: string
    description: string
    date: string
    club: Club
}

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        let didCancel = false;

        async function fetchEvents() {
            const events = await fetch('api/getEvents').then(r => r.json())
            if (!didCancel) {
                setEvents(events)
            }
        }

        fetchEvents()
        return () => { didCancel = true }
    }, [])

    return events
}