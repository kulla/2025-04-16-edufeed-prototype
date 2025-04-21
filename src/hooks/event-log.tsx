import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type Event = CreateUserEvent

interface CreateUserEvent {
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

  const addEvent = useCallback((event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event])
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
