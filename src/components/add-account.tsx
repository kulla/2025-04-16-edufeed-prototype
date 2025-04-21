import { TextInput, Group, Button, Title, Container } from '@mantine/core'
import { useForm } from '@mantine/form'
import useEventLog from '../hooks/event-log'
import { getCurrentUserNames } from '../utils'

export default function AddAccount() {
  const { events, addEvent } = useEventLog()
  const currentUserNames = getCurrentUserNames(events)
  const form = useForm({
    initialValues: {
      userName: '',
    },

    validate: {
      userName(value) {
        if (value === '') {
          return 'Es muss ein Benutzername angegeben werden'
        }
        if (value.length > 20) {
          return 'Benutzername darf maximal 20 Zeichen lang sein'
        }
        if (value.length < 3) {
          return 'Benutzername muss mindestens 3 Zeichen lang sein'
        }
        if (currentUserNames.includes(value)) {
          return 'Benutzername ist bereits vergeben'
        }
        return null
      },
    },
  })

  const handleSubmit = (name: string) => {
    addEvent({ type: 'create-user', name })
  }

  return (
    <Container size="xs" ml="0">
      <Title order={2} mb="md">
        Neuen Account hinzufügen
      </Title>
      <form onSubmit={form.onSubmit(({ userName }) => handleSubmit(userName))}>
        <TextInput
          label="Benutzername"
          placeholder="Benutzername eingeben"
          {...form.getInputProps('userName')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Benutzername hinzufügen</Button>
        </Group>
      </form>
    </Container>
  )
}
