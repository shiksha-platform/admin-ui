import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink
} from 'react-router-dom'
import { Fragment } from 'react'
import { Header } from '../header/Header'
import { Suspense } from 'react'

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

  return (
    <Fragment>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
      />

      <Suspense fallback='loading...'>
        <Router>
          {/* Router component can have only 1 child. We'll use a simple
          div element for this example. */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <ul style={{ listStyle: 'none' }}>
                {routes.map((item: any, index: number) => (
                  <li key={index}>
                    <NavLink to={item.path}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '8px' }}>
              <Routes>
                {routes.map((item: any, index: number) => (
                  <Route
                    key={index}
                    path={item.path}
                    element={<item.component />}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </Router>
      </Suspense>
    </Fragment>
  )
}
