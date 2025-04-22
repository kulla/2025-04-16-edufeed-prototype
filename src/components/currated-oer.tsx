import { Card, Title, Text, SimpleGrid, Container } from '@mantine/core'
import useEventLog from '../hooks/event-log'

export default function CuratedOER({ account }: { account: string }) {
  const { events } = useEventLog()

  const trustedAccounts = events
    .filter((event) => event.type === 'trust')
    .filter((event) => event.actor === account)
    .map((event) => event.account)
  const untrustedAccounts = events
    .filter((event) => event.type === 'create-user')
    .map((event) => event.name)
    .filter((name) => !trustedAccounts.includes(name) && name !== account)
  const curatedOERs = events
    .filter((event) => event.type === 'curate-oer')
    .filter(
      (event) =>
        event.actor === account || trustedAccounts.includes(event.account),
    )

  return (
    <Container size="lg" mt="md">
      <Title order={2} mb="md">
        Kuratierte OERs (Konto: {account})
      </Title>
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
