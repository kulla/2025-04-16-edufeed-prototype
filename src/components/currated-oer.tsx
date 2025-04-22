import { Card, Title, Text, SimpleGrid, Container } from '@mantine/core'
import useEventLog from '../hooks/event-log'

export default function CuratedOER({ account }: { account: string }) {
  const { events } = useEventLog()

  // Filter events to get only the curated OERs by the current user
  const curatedOERs = events
    .filter((event) => event.type === 'curate-oer')
    .filter((event) => event.actor === account)

  return (
    <Container size="lg" mt="md">
      <Title order={2} mb="md">
        Kuratierte OERs (Konto: {account})
      </Title>
      <Text mb="lg">Hier können Sie Ihre kuratierten OERs verwalten.</Text>
      <SimpleGrid cols={3} spacing="lg">
        {curatedOERs.map((event) => (
          <Card key={event.eventId} shadow="sm" padding="lg" withBorder>
            <Title order={3} mb="md">
              OER von „{event.account}”:
            </Title>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
            <Text mt="md" size="sm" c="dimmed">
              Kuratiert von: {event.actor}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
