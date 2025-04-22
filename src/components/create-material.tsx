import {
  Button,
  Group,
  Title,
  Modal,
  Textarea,
  Card,
  Text,
  SimpleGrid,
  Flex,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import useEventLog from '../hooks/event-log'
import { useState } from 'react'
import { BookText } from 'lucide-react'

export default function CreateMaterial({ account }: { account: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [content, setContent] = useState('')
  const { events, addEvent } = useEventLog()
  const myLearningMaterials = events
    .filter((event) => event.type === 'create-learning-material')
    .filter((event) => event.account === account)
    .map((event) => event.content)

  const handleSave = () => {
    if (content.trim() === '') {
      return
    }
    addEvent({ type: 'create-learning-material', account, content })
    setContent('')
    close()
  }

  return (
    <>
      <Title order={2} mb="lg">
        Meine Lernmaterialien (Konto: {account})
      </Title>
      <Group mb="lg">
        <Button onClick={open}>Lernmaterial hinzufügen</Button>
      </Group>
      <Modal opened={opened} onClose={close} title="Lernmaterial hinzufügen">
        <Textarea
          label="Inhalt des Lernmaterials"
          placeholder="Geben Sie den Inhalt des Lernmaterials ein..."
          autosize
          minRows={5}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={handleSave}>Speichern</Button>
        </Group>
      </Modal>
      <SimpleGrid cols={3} spacing="lg" mt="lg">
        {myLearningMaterials.map((material) => (
          <Card key={material} shadow="sm" padding="lg" withBorder>
            <Flex gap="md" align="center">
              <BookText />
              <Text lineClamp={2} style={{ whiteSpace: 'pre-wrap' }}>
                {material}
              </Text>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}
