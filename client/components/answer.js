import { Box, Button, Text, Textarea } from "@chakra-ui/react"
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseURL } from "../constants/baseURL"

export const Answer = () => {
    const router = useRouter()
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState("")
    const id = (router.asPath.split('/')[2])

    console.log(answer)

    const answerHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }

        try {
            await axios.patch(`${baseURL}/api/doubt/${id}`, {
                answer
            },
                config
            )

            router.push("/solve-doubts")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Box ml={6} borderWidth="1px" width="40%" p={4}>
            {error && <Text color="red">{error}</Text>}
            <form onSubmit={answerHandler}>
                <Box mt={4}>
                    <Text mb={1} as="b">Answer:</Text>
                    <Textarea mt={2} placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </Box>
                <Box mt={4} align="right">
                    <Button type='submit'>Answer</Button>
                </Box>
            </form>
        </Box>
    )
}