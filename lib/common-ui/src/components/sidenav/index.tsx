import { Box, Divider, Flex } from '@chakra-ui/react'
import React, { Suspense, useState } from 'react'
import { Fragment } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Icon } from '@chakra-ui/react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export interface NavMenuItemProps {
  path: string
  label: string
  icon?: any
  children?: NavMenuItemProps[]
}
const NavMenuItem = ({ path, label, icon, children }: NavMenuItemProps) => {
  const [isOpen, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!isOpen)
  }
  if (children) {
    return (
      <li style={{ margin: '8px' }}>
        <Flex direction={'row'} onClick={toggle}>
          {icon && <Icon as={icon} />}
          <Box px='2'>
            <NavLink to='#'>{label}</NavLink>
          </Box>
          {!isOpen && <Icon as={FaAngleRight} />}
          {isOpen && <Icon as={FaAngleDown} />}
        </Flex>
        {isOpen && (
          <Box px='2'>
            <NavMenuList routes={children}></NavMenuList>
          </Box>
        )}
      </li>
    )
  } else
    return (
      <li style={{ margin: '8px' }}>
        <Flex direction={'row'}>
          {icon && <Icon as={icon} />}
          <Box px='2'>
            <NavLink to={path}>{label}</NavLink>
          </Box>
        </Flex>
      </li>
    )
}
const NavMenuList = ({ routes, level = 1 }: any) => {
  return (
    <ul style={{ listStyle: 'none', padding: '4px' }}>
      {routes.map((item: any, index: number) => (
        <NavMenuItem key={index} {...item}></NavMenuItem>
      ))}
    </ul>
  )
}
export const SideNav = ({ routes = [] }: any) => {
  return (
    <Fragment>
      <Suspense fallback='loading...'>
        <Router>
          {/* Router component can have only 1 child. We'll use a simple
          div element for this example. */}
          <Flex direction={'row'} bg={'white'}>
            <Box p={'8px'} width='180px'>
              <NavMenuList routes={routes}></NavMenuList>
            </Box>
            <Divider
              orientation='vertical'
              height={'80vh'}
              color={'gray.100'}
            />

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
          </Flex>
        </Router>
      </Suspense>
    </Fragment>
  )
}
