import React from 'react'
import { Button } from '../button/Button'
import style from './header.module.css'
import { Fragment } from 'react'
import { Flex, Box } from '@chakra-ui/react'

type User = {
  name: string | null
}

export interface HeaderProps {
  user?: User
  onLogin: () => void
  onLogout: () => void
}

const Logo = () => {
  return (
    <div>
      <h1>SHIKSHA</h1>
    </div>
  )
}

const NavBarContainer = ({ children, ...props }: any) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={4}
      p={4}
      bg={['primary.100', 'primary.100', 'primary.100', 'primary.100']}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  )
}
export const Header = ({ user, onLogin, onLogout }: HeaderProps) => (
  <NavBarContainer>
    <Logo></Logo>
    <Box>
      {user ? (
        <Fragment>
          <span className={style.welcome}>
            Welcome, <b>{user.name}</b>!
          </span>
          <Button size='small' onClick={onLogout} label='Log out' />
        </Fragment>
      ) : (
        <Fragment>
          <Button size='small' onClick={onLogin} label='Log in' />
        </Fragment>
      )}
    </Box>
  </NavBarContainer>
)
