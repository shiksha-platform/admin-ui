import React from 'react'
import { Button } from '../button/Button'
import style from './header.module.css'
import { Fragment } from 'react'
import { Flex, Box } from '@chakra-ui/react'

type User = {
  name: string
}

export interface HeaderProps {
  user?: User
  onLogin: () => void
  onLogout: () => void
}

const Logo = () => {
  return (
    <div>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g fill='none' fillRule='evenodd'>
          <path
            d='M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z'
            fill='#FFF'
          />
          <path
            d='M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z'
            fill='#555AB9'
          />
          <path
            d='M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z'
            fill='#91BAF8'
          />
        </g>
      </svg>
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
