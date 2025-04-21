import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type Event = CreateUserEvent

interface AbstractEvent {
  eventId: string
}

interface CreateUserEvent extends AbstractEvent {
  type: 'create-user'
  name: string
}

const EventLogContext = createContext<{
  events: Event[]
  addEvent: (event: Omit<Event, 'eventId'>) => void
}>({
  events: [],
  addEvent: () => {},
})

export function EventLogProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])

  const addEvent = useCallback((event: Omit<Event, 'eventId'>) => {
    const newEvent = { ...event, eventId: crypto.randomUUID() }
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }, [])

  return (
    <EventLogContext.Provider value={{ events, addEvent }}>
      {children}
    </EventLogContext.Provider>
  )
}

export default function useEventLog() {
  return useContext(EventLogContext)
}
