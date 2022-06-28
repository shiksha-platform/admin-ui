import React from 'react'
import { Fragment } from 'react'
import { Header } from '../header/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { NavMenuItemProps, RouteProps, SideNav } from '../sidenav'
import { useState } from 'react'
import { eventBus } from '../../services/EventBus'
import { useEffect } from 'react'

export interface AppShellProps {
  label: string
  routes: RouteProps[]
  navLinks: NavMenuItemProps[]
  AuthComponent: any
}
type User = {
  name: string | null
}
/**
 * Primary UI component for user interaction
 */
const getLoggedInUserInfo = () => {
  let userInfoJSON = localStorage.getItem('user_info')
    ? localStorage.getItem('user_info')
    : '{}'
  let userInfo = JSON.parse(userInfoJSON ? userInfoJSON : '')
  return userInfo
}
export const AppShell = ({
  label,
  routes,
  navLinks,
  AuthComponent
}: AppShellProps) => {
  const userName = getLoggedInUserInfo()
    ? getLoggedInUserInfo()['given_name']
    : ''
  const [user, setUser] = React.useState<User>({ name: userName })
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if ((data.eventType = 'LOGIN_SUCCESS')) {
        setToken(localStorage.getItem('token'))
        setUser({ name: getLoggedInUserInfo()['given_name'] })
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token])

  const handleLogout = () => {
    setUser({ name: '' })
    setToken('')
    localStorage.removeItem('token')
    localStorage.removeItem('user_info')
  }

  const theme = extendTheme({
    colors: {
      primary: {
        100: '#F87558',
        900: '#F9EFEC'
      }
    }
  })

  if (!token) {
    return (
      <ChakraProvider theme={theme}>
        <React.Suspense fallback='Loading'>
          <AuthComponent />
        </React.Suspense>
      </ChakraProvider>
    )
  } else {
    return (
      <Fragment>
        <ChakraProvider theme={theme}>
          <Header
            user={user}
            onLogin={() => setUser({ name: 'Jane Doe' })}
            onLogout={handleLogout}
          />
          <SideNav routes={routes} navLinks={navLinks}></SideNav>
        </ChakraProvider>
      </Fragment>
    )
  }
}
