import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { useState } from 'react'

export const ChatInput = ({ sendMessageHandler }) => {
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length === 0) {
            setError("A message cannot be empty")
        }
        if (msg.length > 0) {
            sendMessageHandler(msg)
          setMsg("")
        }
      }

    return (
        <form onSubmit={(event) => sendChat(event)}>
            <Box px={4} mb={4} pt={4}>
                {error && <Text color="red">{error.substring(36)}</Text>}
                <Flex align="center" justify="space-between">
                    <Input
                        variant='filled'
                        placeholder="type your message here..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)} />
                    <Button ml={4} type='submit'>Send message</Button>
                </Flex>
            </Box>
        </form>
    )
}