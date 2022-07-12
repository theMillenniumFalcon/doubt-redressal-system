import { Box, Input, Flex, Button, Text, Heading, InputRightElement, InputGroup, Checkbox } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const SignUp = () => {
    const router = useRouter()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [role, setRole] = useState("")
    const [show, setShow] = useState(false)
    const ref = useRef(null)

    console.log('MyRole', role)

    const handleClick = () => setShow(!show)

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

        const e1 = document.getElementById('student')
        const e2 = document.getElementById('ta')

        if (e1.checked == true) {
            setRole("student")
        } else if (e2.checked == true) {
            setRole("ta")
        } 

        try {
            const { data } = await axios.post(
                `${baseURL}/api/auth/register`,
                {
                    firstname,
                    lastname,
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
                        {error && <Text color="red">{error}</Text>}
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
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Role</Text>
                            <Checkbox ref={ref} id="student">Student</Checkbox>
                            <Checkbox ref={ref} id="ta" ml={4}>Teaching Assistant</Checkbox>
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