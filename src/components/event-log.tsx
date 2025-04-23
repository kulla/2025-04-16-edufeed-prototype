import { Container, Flex, Title, Text } from '@mantine/core'
import useEventLog, { type Event } from '../hooks/event-log'
import {
  BookText,
  UserRoundPlus,
  Heart,
  BookmarkCheck,
  Handshake,
} from 'lucide-react'
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
      return <UserRoundPlus color="blue" />
    case 'create-learning-material':
      return <BookText />
    case 'like':
      return <Heart color="red" />
    case 'curate-oer':
      return <BookmarkCheck color="green" />
    case 'trust':
      return <Handshake color="orange" />
    default:
      return null
  }
}

function getEventText(event: Event) {
  switch (event.type) {
    case 'create-user':
      return `Benutzer „${event.name}“ wurde erstellt.`
    case 'create-learning-material':
      return `Lernmaterial von „${event.account}“ wurde erstellt: ${summarizeContent(event.content)}`
    case 'like':
      return `„${event.actor}“ hat das OER von „${event.account}“ geliked: ${summarizeContent(event.content)}`
    case 'curate-oer':
      return `„${event.actor}“ hat das OER von „${event.account}“ als wertvolles OER markiert: ${summarizeContent(event.content)}`
    case 'trust':
      return `„${event.actor}“ hat „${event.account}“ als vertrauenswürdig markiert.`
    default:
      return ''
  }
}

function summarizeContent(content: string) {
  const singleLineContent = content.replace(/\n/g, ' ')
  return singleLineContent.length > 25
    ? `${singleLineContent.slice(0, 25)}...`
    : singleLineContent
}
