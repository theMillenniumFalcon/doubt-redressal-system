import { Box, Input, Flex, Button, Text, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const SignUp = () => {
    const router = useRouter()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          router.push('/')
        }
      }, [router])

    const registerHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        }

        if (password !== confirmPassword) {
            setPassword("")
            setConfirmPassword("")
            setTimeout(() => {
                setError("")
            }, 5000)
            return setError("Passwords do not match")
        }

        try {
            const { data } = await axios.post(
                `${baseURL}/auth/register`,
                {
                    username,
                    email,
                    password,
                },
                config
            )

            localStorage.setItem("authToken", data.token)

            router.push("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Layout title="Sign Up">
            <Heading as='h2' size='xl'>
                Sign Up
            </Heading>
                <Section>
                    <form onSubmit={registerHandler}>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Flex align="center" justify="space-between">
                            <Box width="45%">
                                <Text mb={1}>First Name</Text>
                                <Input placeholder="first name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </Box>
                            <Box width="45%">
                                <Text mb={1}>Last Name</Text>
                                <Input placeholder="last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </Box>
                            </Flex>
                            <Box mt={4}>
                                <Text mb={1}>Email</Text>
                                <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Password</Text>
                                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Confirm Password</Text>
                                <Input placeholder="confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Button type='submit'>Sign Up</Button>
                            </Box>
                        </Box>
                    </form>
                </Section>
        </Layout>
    )
}

export default SignUp
export { getServerSideProps } from '../components/chakra'