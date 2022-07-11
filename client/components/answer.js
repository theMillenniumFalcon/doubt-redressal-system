import { Box, Button, Text, Textarea } from "@chakra-ui/react"
import { useState } from 'react'

export const Answer = () => {
    const [answer, setAnswer] = useState("")

    return (
        <Box ml={6} borderWidth="1px" width="40%" p={4}>
            <Box mt={4}>
                <Text mb={1} as="b">Answer:</Text>
                <Textarea mt={2} placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </Box>
            <Box mt={4} align="right">
                <Button type='submit'>Answer</Button>
            </Box>
        </Box>
    )
}