import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Layout from "../components/layouts/article"
import Section from "../components/section"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const RaiseDoubt = () => {
    const router = useRouter()
    const [creator, setCreator] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
    }, [router])

    useEffect(() => {
        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }

            try {
                const creator = await axios.get(`${baseURL}`, config)
                setCreator(creator.data)
            } catch (error) {
                localStorage.removeItem("authToken")
            }

        }
        getData()
    }, [])

    const raiseDoubtHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }

        try {
            await axios.post(`${baseURL}/api/doubt`, {
                title,
                description,
                creatorId: creator._id
            },
                config
            )

            router.push("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Layout title="Raise Doubt">
            <Heading as='h2' size='xl'>
                Raise Doubt
            </Heading>
            <Section>
                <form onSubmit={raiseDoubtHandler}>
                    <Box w="100%">
                        {error && <Text>{error}</Text>}
                        <Box mt={4}>
                            <Text mb={1}>Title</Text>
                            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Description</Text>
                            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Box>
                        <Flex align="center" justify="space-between" mt={4}>
                            <Button type='submit'>Ask Doubt</Button>
                        </Flex>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default RaiseDoubt
export { getServerSideProps } from '../components/chakra'