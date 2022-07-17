import Logo from './logo'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Button
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = 'whiteAlpha.900'
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'pink' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const router = useRouter()
  const [user, setUser] = useState("")
  const util = (router.asPath.split('/')[1])
  const { path } = props

  let condition = typeof window !== 'undefined' && localStorage.getItem("authToken")

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try {
        const user = await axios.get(`${baseURL}`, config)
        setUser(user.data)
      } catch (error) {
        localStorage.removeItem("authToken")
      }

    }
    getData()
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem("authToken")
    router.replace('/')
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={'#282c35'}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/" path={path}>
            Home
          </LinkItem>
          {condition ? (
            <>
              <LinkItem href="/raise-doubt" path={path}>
                Raise Doubt
              </LinkItem>
              {user.role === "ta" ? (
                <LinkItem href="/solve-doubts" path={path}>
                  Solve Doubts
                </LinkItem>
              ) : null}
              <LinkItem href="/chat" path={path}>
                Chat
              </LinkItem>
            </>
          ) : null}
        </Stack>

        <Box flex={1} align="right">
          {!condition ? (
            <Button mr={2}>
              {util === "register" ? (
                <NextLink href="/login" passHref>Login</NextLink>
              ) : (
                <NextLink href="/register" passHref>Sign Up</NextLink>
              )}
            </Button>
          ) : null}
          {condition ? (
            <Button mr={2} onClick={logoutHandler}>Logout</Button>
          ) : null}

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>Home</MenuItem>
                </NextLink>
                {condition ? (
                  <Box>
                    <NextLink href="/raise-doubt" passHref>
                      <MenuItem as={Link}>Raise Doubt</MenuItem>
                    </NextLink>
                    {user.role === "ta" ? (
                      <NextLink href="/solve-doubts" passHref>
                        <MenuItem as={Link}>Solve Doubts</MenuItem>
                      </NextLink>
                    ) : null}
                    <NextLink href="/chat" passHref>
                      <MenuItem as={Link}>Chat</MenuItem>
                    </NextLink>
                  </Box>
                ) : null}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
