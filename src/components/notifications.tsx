import { Container, Flex, Title, Text, Card, Group } from '@mantine/core'
import useEventLog from '../hooks/event-log'
import { Heart, BookmarkCheck } from 'lucide-react'
import UserBadge from './user-badge'

export default function Notifications({ account }: { account: string }) {
  const { events } = useEventLog()

  const relevantEvents = events
    .filter((event) => event.type === 'like' || event.type === 'curate-oer')
    .filter((event) => event.account === account)

  return (
    <Container size="lg" mt="md">
      <Title order={2} mb="md">
        Deine Erfolge, <UserBadge account={account} />!
      </Title>
      {relevantEvents.length > 0 ? (
        relevantEvents.map((event) => (
          <NotificationCard key={event.eventId} event={event} />
        ))
      ) : (
        <Text size="lg" c="dimmed">
          Noch keine Likes oder kuratierte Inhalte. Teile deine OERs, um
          Aufmerksamkeit zu bekommen!
        </Text>
      )}
    </Container>
  )
}

function NotificationCard({
  event,
}: { event: { type: string; actor: string; content: string } }) {
  return (
    <Card shadow="sm" padding="lg" mb="md" withBorder>
      <Flex align="center" gap="md">
        {event.type === 'like' ? (
          <Heart color="red" size={24} />
        ) : (
          <BookmarkCheck color="green" size={24} />
        )}
        <Text size="lg">
          {event.type === 'like'
            ? `„${event.actor}“ hat dein OER geliked! 🎉`
            : `„${event.actor}“ hat dein OER als wertvoll markiert! 🌟`}
        </Text>
      </Flex>
      <Text mt="sm" style={{ whiteSpace: 'pre-wrap' }}>
        {event.content}
      </Text>
    </Card>
  )
}
