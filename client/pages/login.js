import { Box, Input, Button, Text, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
    }, [router])


    const loginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        }

        try {
            const { data } = await axios.post(
                `${baseURL}/auth/login`,
                {
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
        <Layout title="Login">
            <Heading as='h2' size='xl'>
                Login
            </Heading>
            <Section>
                <form onSubmit={loginHandler}>
                    <Box w="100%" p={7}>
                        {error && <Text>{error}</Text>}
                        <Box mt={4}>
                            <Text mb={1}>Email</Text>
                            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Password</Text>
                            <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Box mt={4}>
                            <Button type='submit'>Login</Button>
                        </Box>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default Login
export { getServerSideProps } from '../components/chakra'