import { AppShell, Burger, NavLink, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import Accounts from './components/accounts'
import EventLog from './components/event-log'
import Statistics from './components/statistics'
import { HeartHandshake } from 'lucide-react'

const App = () => {
  const [opened, { toggle }] = useDisclosure()
  const [main, setMain] = useState<OpenedView>({ name: 'accounts' })

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />

        <Title order={2}>
          <HeartHandshake color="red" /> Edufeed
        </Title>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Title order={4} mb="md">
          Übersicht
        </Title>
        <NavLink
          active={main.name === 'accounts'}
          label="Alle Accounts"
          onClick={() => setMain({ name: 'accounts' })}
        />
        <NavLink
          active={main.name === 'event-log'}
          label="Event Log"
          onClick={() => setMain({ name: 'event-log' })}
        />
        <NavLink
          active={main.name === 'statistics'}
          label="Statistik"
          onClick={() => setMain({ name: 'statistics' })}
        />
      </AppShell.Navbar>

      <AppShell.Main>{renderMain()}</AppShell.Main>
    </AppShell>
  )

  function renderMain() {
    switch (main.name) {
      case 'accounts':
        return <Accounts />
      case 'event-log':
        return <EventLog />
      case 'statistics':
        return <Statistics />
      default:
        return null
    }
  }
}

type OpenedView =
  | { name: 'accounts' }
  | { name: 'event-log' }
  | { name: 'statistics' }

export default App
