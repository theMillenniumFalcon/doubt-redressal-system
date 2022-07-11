import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { Logo } from "./Logo"

const LinkItem = ({ href, path, target, children, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
    return (
        <NextLink href={href} passHref scroll={false}>
            <Link
                p={2}
                bg={active ? 'grassTeal' : undefined}
                color={active ? '#202023' : inactiveColor}
                target={target}
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    )
}

export const Navbar = (props) => {
    const router = useRouter()
    const util = (router.asPath.split('/')[1])
    const { path } = props
    let condition = true
    return (
        <Flex align="center" justify="space-between" width="100%" px={10} height="60px" backgroundColor="pink">
            <Flex align="center" justify="space-between" width="20%">
                <Logo />
                <LinkItem href="/" path={path}>
                    Home
                </LinkItem>
                <LinkItem href="/login" path={path}>
                    Raise Doubt
                </LinkItem>
            </Flex>
            <Box>
                {condition ? (
                    <Button>
                        {util === "register" ? (
                            <NextLink href="/login" passHref>Login</NextLink>
                        ) : (
                            <NextLink href="/register" passHref>Register</NextLink>
                        )}
                    </Button>
                ) : (
                    <Button>
                        Logout
                    </Button>
                )}
            </Box>
        </Flex>
    )
}