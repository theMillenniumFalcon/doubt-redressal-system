import { Box, Input, Button, Heading, Flex, Stack, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import Horizontal from '../components/Horizontal'
import { ChatBox } from '../components/ChatBox'

const Chat = () => {
    const router = useRouter()
    const [chat, setChat] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.push('/')
        }

        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }

            try {
                const user = await axios.get(`${baseURL}`, config)
                const users = await axios.get(`${baseURL}/api/user/except/${user.data._id}`, config)
                setUsers(users.data)
            } catch (error) {
                // localStorage.removeItem("authToken")
                // router.replace('/')
                console.log(error)
            }
        }
        getData()
    }, [router])

    const messageHandler = async () => {

    }

    return (
        <Layout title="Chat">
            {!users.users ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Heading as='h2' size='xl'>
                        Chat
                    </Heading>
                    <Section>
                        <Box w="100%" mt={4} borderWidth="1px">
                            <Flex>
                                <Box width="20%">
                                    <Flex width="100%" height="7vh" p={4} align="center">
                                        <Heading as='h4' size='md' align='left'>
                                            Users
                                        </Heading>
                                    </Flex>
                                    <Stack
                                        spacing={4}
                                        p={4}
                                        height="55vh"
                                        width="100%"
                                        overflow="auto"
                                    >
                                        {users?.users?.map((item) => !users.users ? null : (
                                            <Box borderWidth="1px" mb={2} p={2} key={item._id} cursor="pointer">
                                                {item.firstname}
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                                <Box ml={4} borderLeftWidth="1px" width="80%">
                                    <Flex width="100%" height="7vh" p={4} align="center" justify="space-between">
                                        <Heading as='h4' size='md' align='left'>
                                            Users
                                        </Heading>
                                        <Box
                                            border="1px solid #fff"
                                            backgroundColor="rgba(255, 255, 255, 0.05)"
                                            cursor="pointer"
                                            ml={4}
                                            py={1}
                                            px={5}
                                            onClick={() => router.push('/chat')}
                                        >
                                            Leave Chat
                                        </Box>
                                    </Flex>
                                    <Stack
                                        spacing={4}
                                        p={4}
                                        height="55vh"
                                        width="100%"
                                        overflow="auto"
                                    >
                                        <ChatBox />
                                        <ChatBox />
                                        <ChatBox />
                                        <ChatBox />
                                        <ChatBox />
                                    </Stack>
                                </Box>
                            </Flex>
                            <Horizontal />
                            <form onSubmit={messageHandler}>
                            <Flex px={4} mb={4} pt={4} align="center" justify="space-between">
                                
                                    <Input
                                        variant='filled'
                                        placeholder="type your message here..."
                                        value={chat}
                                        onChange={(e) => setChat(e.target.value)} />
                                    <Button ml={4} type='submit'>Send message</Button>
                            </Flex>
                            </form>
                        </Box>
                    </Section>
                </>
            )}

        </Layout>
    )
}

export default Chat
export { getServerSideProps } from '../components/chakra'