import { Button, Group, Title, Modal, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import useEventLog from '../hooks/event-log'
import { useState } from 'react'

export default function CreateMaterial({ account }: { account: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [content, setContent] = useState('')
  const { addEvent } = useEventLog()

  const handleSave = () => {
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
    </>
  )
}
