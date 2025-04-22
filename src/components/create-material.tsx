import { Button, Group, Title, Modal, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function CreateMaterial({ account }: { account: string }) {
  const [opened, { open, close }] = useDisclosure(false)

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
        />
      </Modal>
    </>
  )
}
