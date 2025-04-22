import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

type BaseEvent = CreateUserEvent | CreateLearningMaterialEvent
export type Event = BaseEvent & { eventId: string }

interface CreateUserEvent {
  type: 'create-user'
  name: string
}

interface CreateLearningMaterialEvent {
  type: 'create-learning-material'
  account: string
  content: string
}

const EventLogContext = createContext<{
  events: Event[]
  addEvent: (event: BaseEvent) => void
}>({
  events: [],
  addEvent: () => {},
})

export function EventLogProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])

  const addEvent = useCallback((event: BaseEvent) => {
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
