import {
  Card,
  Title,
  Text,
  SimpleGrid,
  Container,
  NativeSelect,
  Button,
  Group,
} from '@mantine/core'
import { useState } from 'react'
import useEventLog from '../hooks/event-log'

export default function CuratedOER({ account }: { account: string }) {
  const { events, addEvent } = useEventLog()

  const trustedAccounts = events
    .filter((event) => event.type === 'trust')
    .filter((event) => event.actor === account)
    .map((event) => event.account)

  const untrustedAccounts = events
    .filter((event) => event.type === 'create-user')
    .map((event) => event.name)
    .filter((name) => !trustedAccounts.includes(name) && name !== account)
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    untrustedAccounts.length > 0 ? untrustedAccounts[0] : undefined,
  )

  const curatedOERs = events
    .filter((event) => event.type === 'curate-oer')
    .filter(
      (event) =>
        event.actor === account || trustedAccounts.includes(event.account),
    )

  const handleTrustUser = () => {
    if (selectedAccount) {
      addEvent({
        type: 'trust',
        actor: account,
        account: selectedAccount,
      })
    }
  }

  return (
    <Container size="lg" mt="md">
      <Title order={2} mb="md">
        Kuratierte OERs (Konto: {account})
      </Title>

      {untrustedAccounts.length > 0 ? (
        <Group align="flex-end" mb="lg" gap="md">
          <NativeSelect
            data={untrustedAccounts}
            value={selectedAccount}
            onChange={(event) => setSelectedAccount(event.currentTarget.value)}
            label="Wähle einen Benutzer, dem du vertrauen möchtest"
          />
          <Button onClick={handleTrustUser} style={{ flexShrink: 0 }}>
            User vertrauen
          </Button>
        </Group>
      ) : null}

      {/* Curated OERs Section */}
      <SimpleGrid cols={3} spacing="lg">
        {curatedOERs.map((event) => (
          <Card key={event.eventId} shadow="sm" padding="lg" withBorder>
            <Title order={3} mb="md">
              OER von „{event.account}”:
            </Title>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
            <Text mt="md" size="sm" c="dimmed">
              Kuratiert von: {event.actor}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
