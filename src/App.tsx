import { AppShell, Burger, NavLink, ScrollArea, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  ChartColumn,
  HeartHandshake,
  ScrollText,
  UserRoundPlus,
  Users,
  User,
  BookText,
  Globe,
  BookmarkCheck,
  Bell,
} from 'lucide-react'
import { useState } from 'react'

import useEventLog, { EventLogProvider } from './hooks/event-log'
import EventLog from './components/event-log'
import Statistics from './components/statistics'
import AddAccount from './components/add-account'
import { getCurrentUserNames } from './utils'
import CreateMaterial from './components/create-material'
import Explore from './components/explore'
import Notifications from './components/notifications'
import CurratedOER from './components/currated-oer'
import UserIcon from './components/user-icon'

function AppWithProvider() {
  return (
    <EventLogProvider>
      <App />
    </EventLogProvider>
  )
}

function App() {
  const [opened, { toggle }] = useDisclosure()
  const [main, setMain] = useState<OpenedView>({ name: 'add-account' })
  const { events } = useEventLog()
  const accounts = getCurrentUserNames(events)

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
        <ScrollArea>
          <Title order={4} mb="md">
            Deine Accounts
          </Title>
          <NavLink
            label="Neuen Account hinzufügen"
            leftSection={<UserRoundPlus size={18} />}
            active={main.name === 'add-account'}
            onClick={() => setMain({ name: 'add-account' })}
          />

          {accounts.map((account) => (
            <NavLink
              key={account}
              label={`Benutzer „${account}“`}
              leftSection={<UserIcon account={account} />}
              opened
            >
              <NavLink
                label="Meine Lernmaterialien"
                leftSection={<BookText size={18} />}
                active={main.name === 'material' && main.account === account}
                onClick={() => setMain({ name: 'material', account })}
              />
              <NavLink
                label="Explore"
                leftSection={<Globe size={18} />}
                active={main.name === 'explore' && main.account === account}
                onClick={() => setMain({ name: 'explore', account })}
              />
              <NavLink
                label="Meine kuratierten OER"
                leftSection={<BookmarkCheck size={18} />}
                active={
                  main.name === 'currated-oer' && main.account === account
                }
                onClick={() => setMain({ name: 'currated-oer', account })}
              />
              <NavLink
                label="Benachrichtigungen"
                leftSection={<Bell size={18} />}
                active={
                  main.name === 'notification' && main.account === account
                }
                onClick={() => setMain({ name: 'notification', account })}
              />
            </NavLink>
          ))}

          <Title order={4} mb="md" mt="lg">
            Übersicht
          </Title>
          <NavLink
            label="Event Log"
            leftSection={<ScrollText size={18} />}
            active={main.name === 'event-log'}
            onClick={() => setMain({ name: 'event-log' })}
          />
          <NavLink
            label="Statistik"
            leftSection={<ChartColumn size={18} />}
            active={main.name === 'statistics'}
            onClick={() => setMain({ name: 'statistics' })}
          />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{renderMain()}</AppShell.Main>
    </AppShell>
  )

  function renderMain() {
    switch (main.name) {
      case 'add-account':
        return <AddAccount />
      case 'event-log':
        return <EventLog />
      case 'statistics':
        return <Statistics />
      case 'material':
        return <CreateMaterial account={main.account} />
      case 'explore':
        return <Explore account={main.account} />
      case 'notification':
        return <Notifications account={main.account} />
      case 'currated-oer':
        return <CurratedOER account={main.account} />
      default:
        return null
    }
  }
}

type OpenedView =
  | { name: 'add-account' }
  | { name: 'material'; account: string }
  | { name: 'explore'; account: string }
  | { name: 'notification'; account: string }
  | { name: 'currated-oer'; account: string }
  | { name: 'event-log' }
  | { name: 'statistics' }

export default AppWithProvider
