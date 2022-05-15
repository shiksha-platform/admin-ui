import React from 'react'
import { Fragment } from 'react'
import { Header } from '../header/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { SideNav } from '../sidenav'

type RouteProps = {
  path: string
  label: string
  component: any
}
export interface AppShellProps {
  label: string
  routes: RouteProps[]
}
type User = {
  name: string
}
/**
 * Primary UI component for user interaction
 */
export const AppShell = ({ label, routes = [] }: AppShellProps) => {
  const [user, setUser] = React.useState<User>()

  const theme = extendTheme({
    colors: {
      primary: {
        100: '#F87558',
        900: '#F875ff'
      }
    }
  })
  return (
    <Fragment>
      <ChakraProvider theme={theme}>
        <Header
          user={user}
          onLogin={() => setUser({ name: 'Jane Doe' })}
          onLogout={() => setUser(undefined)}
        />
        <SideNav routes={routes}></SideNav>
      </ChakraProvider>
    </Fragment>
  )
}
