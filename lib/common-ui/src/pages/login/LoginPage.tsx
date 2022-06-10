import React from 'react'

import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
//import { eventBus } from '../../services/EventBus';
import { fetchToken, fetchUserInfo } from '../../services/Auth'
import { Fragment } from 'react'
import { eventBus } from '../../services/EventBus'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

type Credenntial = {
  username: string
  password: string
}
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [credentials, setCredentials] = useState<Credenntial>({
    username: '',
    password: ''
  })
  const [errors, setErrors] = React.useState<Credenntial>({
    username: '',
    password: ''
  })

  const handleShowClick = () => setShowPassword(!showPassword)

  const validate = () => {
    let arr: Credenntial = { username: '', password: '' }
    if (
      typeof credentials?.username === 'undefined' ||
      credentials?.username === ''
    ) {
      arr = { ...arr, username: 'Username is required' }
    }

    if (
      typeof credentials?.password === 'undefined' ||
      credentials?.password === ''
    ) {
      arr = { ...arr, password: 'Password is required' }
    }

    setErrors(arr)
    if (arr.username || arr.password) {
      return false
    }
    return true
  }

  //TODO: use endpoint url from environment variables
  const handleLogin = async (event: any) => {
    event.preventDefault()
    if (validate()) {
      const result = await fetchToken(
        'https://dev-shiksha.uniteframework.io/auth/realms/sunbird-rc/protocol/openid-connect/token',
        credentials?.username,
        credentials?.password
      )
      console.log(result)

      if (result.status && result.status === 200 && result?.data) {
        console.log(result)
        let token = result.data.access_token
        const userInfoResponse = await fetchUserInfo(
          'https://dev-shiksha.uniteframework.io/auth/realms/sunbird-rc/protocol/openid-connect/userinfo',
          token
        )
        console.log(userInfoResponse)

        if (
          userInfoResponse &&
          userInfoResponse.status === 200 &&
          userInfoResponse.data
        ) {
          localStorage.setItem(
            'user_info',
            JSON.stringify(userInfoResponse.data)
          )
          localStorage.setItem(
            'user_name',
            JSON.stringify(userInfoResponse.data['giiven_name'])
          )
          localStorage.setItem('token', token)
          eventBus.publish('AUTH', {
            eventType: 'LOGIN_SUCCESS',
            data: {
              token: token,
              user: userInfoResponse.data
            }
          })
        }
      } else {
        localStorage.removeItem('token')
        let errDescription = result.response?.data?.error_description
        let err: Credenntial = { username: '', password: errDescription }
        setErrors(err)
        eventBus.publish('AUTH', {
          eventType: 'LOGIN_ERROR',
          data: result?.data
        })
      }

      return true
    } else {
      return false
    }
  }
  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading color='primary.100'>Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl isInvalid={errors.username != ''} isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='email'
                    placeholder='email address'
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value
                      })
                    }
                  />
                </InputGroup>

                {errors.username != '' ? (
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                ) : (
                  <Fragment></Fragment>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password != ''} isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<CFaLock color='gray.300' />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value
                      })
                    }
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password != '' ? (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                ) : (
                  <Fragment></Fragment>
                )}
                <FormHelperText textAlign='right'>
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
