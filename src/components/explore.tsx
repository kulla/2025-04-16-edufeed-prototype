import { Group, Button, Card, Title, Text, Container } from '@mantine/core'
import useEventLog from '../hooks/event-log'
import { reverse } from 'ramda'
import { BookmarkCheck, Heart } from 'lucide-react'

export default function Explore({ account }: { account: string }) {
  const { events, addEvent } = useEventLog()
  const otherContents = reverse(
    events
      .filter((event) => event.type === 'create-learning-material')
      .filter((event) => event.account !== account),
  )

  const handleLike = (accountName: string, content: string) => {
    addEvent({
      type: 'like',
      actor: account,
      account: accountName,
      content,
    })
  }

  const handleCurateOER = (accountName: string, content: string) => {
    addEvent({
      type: 'curate-oer',
      actor: account,
      account: accountName,
      content,
    })
  }

  return (
    <Container size="sm" ml={0}>
      <Title order={2} mb="md">
        Inhalter anderer Accounts
      </Title>
      {otherContents.map((event) => (
        <Card key={event.eventId} shadow="sm" padding="lg" mt="md" withBorder>
          <Title order={3} mb="md">
            OER von „{event.account}”:
          </Title>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
          <Group gap={10} mt="md">
            <Button
              leftSection={<Heart size={16} />}
              variant="light"
              color="red"
              onClick={() => handleLike(event.account, event.content)}
            >
              Like
            </Button>
            <Button
              leftSection={<BookmarkCheck size={16} />}
              variant="light"
              color="green"
              onClick={() => handleCurateOER(event.account, event.content)}
            >
              Wertvolles OER
            </Button>
          </Group>
        </Card>
      ))}
    </Container>
  )
}
