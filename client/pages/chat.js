import { Box, Heading, Flex, Stack, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import Horizontal from '../components/Horizontal'
import { ChatBox } from '../components/ChatBox'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from "uuid"
import { ChatInput } from '../components/ChatInput'

const Chat = () => {
    const socket = useRef()
    const scrollRef = useRef()
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const [currentChat, setCurrentChat] = useState("")
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)

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
                setUser(user.data)
            } catch (error) {
                // localStorage.removeItem("authToken")
                router.replace('/')
            }
        }
        getData()
    }, [router])

    useEffect(() => {
        if (user) {
            socket.current = io(baseURL)
            socket.current.emit("add-user", user._id)
        }
    }, [user, user._id])

    useEffect(() => {
        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }

            try {
                if (currentChat) {
                    const messages = await axios.post(`${baseURL}/api/messages/getmsg`, {
                        from: user._id,
                        to: currentChat._id
                    }, config)
                    setMessages(messages.data)
                }
            } catch (error) {
                localStorage.removeItem("authToken")
                router.replace('/')
            }
        }
        getData()
    }, [currentChat, router, user._id])

    const sendMessageHandler = async (msg) => {
        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }

        try {
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: user._id,
                msg,
            })

            await axios.post(`${baseURL}/api/messages/addmsg`, {
                from: user._id,
                to: currentChat._id,
                message: msg,
            }, config)

            const msgs = [...messages]
            msgs.push({ fromSelf: true, message: msg })
            setMessages(msgs)

        } catch (error) {
            // setError(error.response.data.error)
            // setTimeout(() => {
            //     setError("")
            // }, 5000)
            console.log(error)
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

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
                                    <Flex width="100%" height="7vh" p={4} align="center" justify="space-between">
                                        <Heading as='h4' size='md' align='left'>
                                            Users
                                        </Heading>
                                    </Flex>
                                    <Horizontal />
                                    <Stack
                                        spacing={2}
                                        p={4}
                                        height="50vh"
                                        width="100%"
                                        overflow="auto"
                                    >
                                        {users?.users?.map((item) => !users.users ? null : (
                                            <Box
                                                borderWidth="1px"
                                                borderRadius={4}
                                                mb={2}
                                                p={2}
                                                key={item._id}
                                                cursor="pointer"
                                                _hover={{ bgColor: "rgba(255, 255, 255, 0.05)" }}
                                                onClick={() => setCurrentChat(item)}
                                                backgroundColor={currentChat._id === item._id ? "rgba(255, 255, 255, 0.05)" : null}
                                            >
                                                {item.firstname}
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                                <Box borderLeftWidth="1px" width="80%">
                                    <Flex width="100%" height="7vh" p={4} align="center" justify="space-between">
                                        <Heading as='h4' size='md' align='left'>
                                            {currentChat.firstname}
                                        </Heading>
                                        <Box
                                            border="1px solid #fff"
                                            backgroundColor="rgba(255, 255, 255, 0.05)"
                                            cursor="pointer"
                                            py={1}
                                            px={5}
                                            onClick={() => setCurrentChat("")}
                                        >
                                            Leave Chat
                                        </Box>
                                    </Flex>
                                    <Horizontal />
                                    {currentChat === "" ? (
                                        <Text
                                            p={4}
                                            height="50vh"
                                            width="100%"
                                            fontSize='xl'
                                        >
                                            Click on a user to start chatting
                                        </Text>
                                    ) : (
                                        <Box
                                            p={4}
                                            height="50vh"
                                            width="100%"
                                            overflow="auto"
                                        >
                                            {!messages ? null : messages?.length === 0 ? (
                                                <Text>Messages will be displayed here</Text>
                                            ) : (
                                                <Box>
                                                    {messages?.map((item) => !messages ? (
                                                        <Text>Loading...</Text>
                                                    ) : (
                                                        <Box key={uuidv4()} align={item.fromSelf ? "right" : "left"} ref={scrollRef}>
                                                            <ChatBox item={item} socket={socket} />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Flex>
                            <Horizontal />
                            <ChatInput sendMessageHandler={sendMessageHandler} />
                        </Box>
                    </Section>
                </>
            )}

        </Layout>
    )
}

export default Chat
export { getServerSideProps } from '../components/chakra'