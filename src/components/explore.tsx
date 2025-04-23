import { Group, Button, Card, Title, Text, Container } from '@mantine/core'
import useEventLog from '../hooks/event-log'
import { reverse } from 'ramda'
import { BookmarkCheck, Heart } from 'lucide-react'
import UserBadge from './user-badge'

export default function Explore({ account }: { account: string }) {
  const { events, addEvent } = useEventLog()
  const otherContents = reverse(
    events
      .filter((event) => event.type === 'create-learning-material')
      .filter((event) => event.account !== account),
  )
  const likedContents = events
    .filter((event) => event.type === 'like')
    .filter((event) => event.actor === account)
  const curatedOERs = events
    .filter((event) => event.type === 'curate-oer')
    .filter((event) => event.actor === account)

  return (
    <Container size="sm" ml={0}>
      <Title order={2} mb="md">
        Entdecke andere OERs (Konto: <UserBadge account={account} />)
      </Title>
      {otherContents.map((event) => (
        <OERCard key={event.eventId} event={event} />
      ))}
    </Container>
  )

  function OERCard({ event }: { event: (typeof otherContents)[number] }) {
    const isLiked = likedContents.some(
      (likedEvent) =>
        likedEvent.content === event.content &&
        likedEvent.account === event.account,
    )
    const isCurated = curatedOERs.some(
      (curatedEvent) =>
        curatedEvent.content === event.content &&
        curatedEvent.account === event.account,
    )

    const handleLike = () => {
      if (!isLiked) {
        addEvent({
          type: 'like',
          actor: account,
          account: event.account,
          content: event.content,
        })
      }
    }

    const handleCurateOER = () => {
      if (!isCurated) {
        addEvent({
          type: 'curate-oer',
          actor: account,
          account: event.account,
          content: event.content,
        })
      }
    }

    return (
      <Card key={event.eventId} shadow="sm" padding="lg" mt="md" withBorder>
        <Title order={3} mb="md">
          OER von <UserBadge account={event.account} />:
        </Title>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
        <Group gap={10} mt="md">
          <Button
            leftSection={<Heart size={16} />}
            variant={isLiked ? 'filled' : 'light'}
            color="red"
            onClick={() => handleLike()}
          >
            Like
          </Button>
          <Button
            leftSection={<BookmarkCheck size={16} />}
            variant={isCurated ? 'filled' : 'light'}
            color="green"
            onClick={() => handleCurateOER()}
          >
            Wertvolles OER
          </Button>
        </Group>
      </Card>
    )
  }
}
