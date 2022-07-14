import { Box, Input, Button, Text, Heading, Select, Flex, UnorderedList, ListItem, Stack } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../constants/baseURL'
import Horizontal from '../../components/Horizontal'
import { ChatBox } from '../../components/ChatBox'

const Chat = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [chat, setChat] = useState("")

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
                <Box w="100%" mt={4} borderWidth="1px">
                    <Flex align="center" justify="space-between" py={4} px={4}>
                        <Heading as='h4' size='md'>
                            RoomName
                        </Heading>
                        <Box
                            border="1px solid #fff"
                            backgroundColor="rgba(255, 255, 255, 0.05)"
                            cursor="pointer"
                            ml={4}
                            py={1}
                            px={5}
                            onClick={() => router.push('/chat')}
                        >Leave Room</Box>
                    </Flex>
                    <Horizontal />
                    <Flex>
                        <Box pt={4} px={4}>
                            <Heading as='h4' size='md' align='left'>
                                Users
                            </Heading>
                            <UnorderedList pt={4}>
                                <ListItem mb={2}>Lorem ipsum dolor sit amet</ListItem>
                                <ListItem mb={2}>Lorem ipsum dolor sit amet</ListItem>
                                <ListItem mb={2}>Lorem ipsum dolor sit amet</ListItem>
                                <ListItem mb={2}>Lorem ipsum dolor sit amet</ListItem>
                                <ListItem mb={2}>Lorem ipsum dolor sit amet</ListItem>
                            </UnorderedList>
                        </Box>
                        <Stack
                            spacing={4}
                            ml={4}
                            p={4}
                            height="50vh"
                            borderLeftWidth="1px"
                            width="100%"
                            style={{scrollBehavior: "auto"}}
                            >
                            <ChatBox />
                            <ChatBox />
                            <ChatBox />
                            <ChatBox />
                            <ChatBox />
                        </Stack>
                    </Flex>
                    <Horizontal />
                    <Flex px={4} mb={4} pt={4} align="center" justify="space-between">
                        <Input
                            variant='filled'
                            placeholder="Add Comment"
                            value={chat}
                            onChange={(e) => setChat(e.target.value)} />
                        <Button ml={4} type='submit'>Send message</Button>
                    </Flex>
                </Box>
            </Section>
        </Layout>
    )
}

export default Chat
export { getServerSideProps } from '../../components/chakra'