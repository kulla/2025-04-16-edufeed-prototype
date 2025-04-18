import '@mantine/core/styles.css'
import { Button, createTheme, MantineProvider } from '@mantine/core'
import './App.css'

const theme = createTheme({})

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Button variant="filled" color="blue">
        Button
      </Button>
    </MantineProvider>
  )
}

export default App
