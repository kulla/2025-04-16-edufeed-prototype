import { Card, Title, Text, Container } from '@mantine/core'
import useEventLog from '../hooks/event-log'
import { reverse } from 'ramda'

export default function Explore({ account }: { account: string }) {
  const { events } = useEventLog()
  const otherContents = reverse(
    events
      .filter((event) => event.type === 'create-learning-material')
      .filter((event) => event.account !== account),
  )

  return (
    <Container size="sm" ml={0}>
      <Title order={2} mb="md">
        Inhalter anderer Accounts
      </Title>
      {otherContents.map((event) => (
        <Card key={event.eventId} shadow="sm" padding="lg" mt="md" withBorder>
          <Title order={3} mb="md">
            „{event.account}” hat folgendes OER erstellt:
          </Title>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
        </Card>
      ))}
    </Container>
  )
}
