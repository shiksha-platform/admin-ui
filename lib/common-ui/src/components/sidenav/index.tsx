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

export interface RouteProps {
  path: string
  component: any
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
            <NavMenuList navLinks={children}></NavMenuList>
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
const NavMenuList = ({
  navLinks,
  level = 1
}: {
  navLinks: NavMenuItemProps[]
  level?: number
}) => {
  return (
    <ul style={{ listStyle: 'none', padding: '4px' }}>
      {navLinks.map((item: NavMenuItemProps, index: number) => (
        <NavMenuItem key={index} {...item}></NavMenuItem>
      ))}
    </ul>
  )
}
export const SideNav = ({ routes, navLinks }: any) => {
  
  return (
    <Fragment>
      <Suspense fallback='loading...'>
        <Router>
          {/* Router component can have only 1 child. We'll use a simple
          div element for this example. */}
          <Flex direction={'row'} bg={'white'}>
            <Box p={'8px'} width='180px'>
              <NavMenuList navLinks={navLinks}></NavMenuList>
            </Box>
            <Divider
              orientation='vertical'
              height={'80vh'}
              color={'gray.100'}
            />

            <div style={{ padding: '8px' }}>
              <Routes>
              {routes.map((item: any, index: number) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  )
                })}
          
              </Routes>
            </div>
          </Flex>
        </Router>
      </Suspense>
    </Fragment>
  )
}

/*
{routes.map((item: any, index: number) => {
                  console.log(item)
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  )
                })}
*/