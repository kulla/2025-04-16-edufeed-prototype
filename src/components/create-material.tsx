import { Button, Group, Title, Modal, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function CreateMaterial({ account }: { account: string }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Title order={2} mb="lg">
        Meine Lernmaterialien (von „{account}“)
      </Title>
      <Group mb="lg">
        <Button onClick={open}>Neues Lernmaterial erstellen</Button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        title="Neues Lernmaterial erstellen"
      >
        <Textarea
          label="Lernmaterial"
          placeholder="Geben Sie hier Ihr Lernmaterial ein."
          autosize
          minRows={5}
        />
      </Modal>
    </>
  )
}
