import { Container, Flex, Title, Text } from '@mantine/core'
import useEventLog, { type Event } from '../hooks/event-log'
import { UserRoundPlus } from 'lucide-react'
import { reverse } from 'ramda'

export default function EventLog() {
  const { events } = useEventLog()

  return (
    <Container size="lg" ml="0">
      <Title order={2} mb="md">
        Event Log
      </Title>

      {reverse(events).map((event) => (
        <EventEntry key={event.eventId} event={event} />
      ))}
    </Container>
  )
}

function EventEntry({ event }: { event: Event }) {
  return (
    <Flex
      mb="md"
      p="md"
      gap="md"
      style={{ border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <EventIcon event={event} />
      <Text>{getEventText(event)}</Text>
    </Flex>
  )
}

function EventIcon({ event }: { event: Event }) {
  switch (event.type) {
    case 'create-user':
      return <UserRoundPlus />
    default:
      return null
  }
}

function getEventText(event: Event) {
  switch (event.type) {
    case 'create-user':
      return `Benutzer „${event.name}“ wurde erstellt.`
    default:
      return ''
  }
}
