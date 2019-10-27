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
    imageUrl: string
}

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        let didCancel = false;

        async function fetchEvents() {
            const events = await fetch('api/events').then(r => r.json())
            if (!didCancel) {
                setEvents(events)
            }
        }

        fetchEvents()
        return () => { didCancel = true }
    }, [])

    return events
}

export function useClubs() {
    const [clubs, setClubs] = useState<Club[]>([])

    useEffect(() => {
        let didCancel = false;

        async function fetchEvents() {
            const clubs = await fetch('api/clubs').then(r => r.json())
            if (!didCancel) {
                setClubs(clubs)
            }
        }

        fetchEvents()
        return () => { didCancel = true }
    }, [])

    return clubs
}

export function useEvent(eventId: string) {
    const [event, setEvent] = useState<Event>()

    useEffect(() => {
        let didCancel = false;

        async function fetchEvents() {
            const event = await fetch(`api/events/${eventId}`).then(r => r.json())
            if (!didCancel) {
                setEvent(event)
            }
        }

        fetchEvents()
        return () => { didCancel = true }
    }, [eventId])

    return event
}