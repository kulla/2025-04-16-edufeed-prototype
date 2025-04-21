import type { Event } from './hooks/event-log'

export function getCurrentUserNames(events: Event[]) {
  return events
    .filter((event) => event.type === 'create-user')
    .map((event) => event.name)
}
