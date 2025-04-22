import { Card, Grid, Text, Title, Group } from '@mantine/core'
import { User, BookText, HeartHandshake, BookmarkCheck } from 'lucide-react'
import useEventLog from '../hooks/event-log'

export default function Statistics() {
  const { events } = useEventLog()

  const {
    numberOfUsers,
    numberOfLearningMaterials,
    numberOfLikes,
    numberOfCuratedOERs,
  } = events.reduce(
    (acc, event) => {
      switch (event.type) {
        case 'create-user':
          acc.numberOfUsers += 1
          break
        case 'create-learning-material':
          acc.numberOfLearningMaterials += 1
          break
        case 'like':
          acc.numberOfLikes += 1
          break
        case 'curate-oer':
          acc.numberOfCuratedOERs += 1
          break
      }
      return acc
    },
    {
      numberOfUsers: 0,
      numberOfLearningMaterials: 0,
      numberOfLikes: 0,
      numberOfCuratedOERs: 0,
    },
  )

  return (
    <>
      <Title order={2} mb="lg">
        Statistiken
      </Title>

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Group align="center">
              <User size={32} />
              <Text size="lg">{numberOfUsers}</Text>
              <Text>Anzahl der Benutzer</Text>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Group align="center">
              <BookText size={32} />
              <Text size="lg">{numberOfLearningMaterials}</Text>
              <Text>Lernmaterialien</Text>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Group align="center">
              <HeartHandshake size={32} />
              <Text size="lg">{numberOfLikes}</Text>
              <Text>Likes</Text>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Group align="center">
              <BookmarkCheck size={32} />
              <Text size="lg">{numberOfCuratedOERs}</Text>
              <Text>Kuratierte OERs</Text>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  )
}
