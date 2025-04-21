import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const App = () => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  )
}

export default App
