import { Box, Input, Button, Text, Heading, Select } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../constants/baseURL'

const Chat = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.push('/')
        }
    }, [router])

    return (
        <Layout title="Chat">
            <Heading as='h2' size='xl'>
                Chat
            </Heading>
            <Section>
                <form>
                    <Box w="100%" p={7}>
                        {error && <Text color="red">{error}</Text>}
                        <Box mt={4}>
                            <Text mb={1}>Select Room</Text>
                            <Select placeholder='Select room'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Box>
                        <Box mt={4}>
                            <Button type='submit'>Join Room</Button>
                        </Box>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default Chat
export { getServerSideProps } from '../../components/chakra'