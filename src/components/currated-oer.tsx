import {
  Button,
  Card,
  Container,
  Group,
  NativeSelect,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'
import { useState } from 'react'
import useEventLog from '../hooks/event-log'
import UserBadge from './user-badge'

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
        event.actor === account || trustedAccounts.includes(event.actor),
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
        Kuratierte OERs (Konto: <UserBadge account={account} />)
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
              OER von <UserBadge account={event.account} />:
            </Title>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{event.content}</Text>
            <Text mt="md" size="sm" c="dimmed">
              Kuratiert von: <UserBadge account={event.actor} size={14} />
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
