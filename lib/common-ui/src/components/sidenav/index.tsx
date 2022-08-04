import { Box, Divider, Flex, ListItem, List, HStack } from '@chakra-ui/react'
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
      <ListItem py='2'>
        <HStack
          onClick={toggle}
          alignItems='center'
          justifyContent={'space-between'}
        >
          <HStack spacing={2} alignItems='center'>
            {icon && <Icon as={icon} />}
            <NavLink to='#'>{label}</NavLink>
          </HStack>
          {!isOpen && <Icon as={FaAngleRight} />}
          {isOpen && <Icon as={FaAngleDown} />}
        </HStack>
        {isOpen && (
          <Box px='3'>
            <NavMenuList navLinks={children}></NavMenuList>
          </Box>
        )}
      </ListItem>
    )
  } else
    return (
      <ListItem py='2'>
        <HStack onClick={toggle} alignItems='center' spacing={2}>
          {icon && <Icon as={icon} />}
          <NavLink to={path}>{label}</NavLink>
        </HStack>
      </ListItem>
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
    <List spacing={1}>
      {navLinks.map((item: NavMenuItemProps, index: number) => (
        <NavMenuItem key={index} {...item}></NavMenuItem>
      ))}
    </List>
  )
}
export const SideNav = ({ routes, navLinks }: any) => {
  return (
    <Fragment>
      <Suspense fallback='loading...'>
        <Router>
          <Flex direction={'row'} bg={'white'}>
            <Box p={'20px'} width='250px' height='auto'>
              <NavMenuList navLinks={navLinks}></NavMenuList>
            </Box>
            <Divider
              orientation='vertical'
              height={'80vh'}
              color={'gray.100'}
            />

            <div
              style={{
                padding: '40px 8px',
                flex: '1',
                backgroundColor: '#f9f9f9'
              }}
            >
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
