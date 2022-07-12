import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Layout from "../../../components/layouts/article"
import Section from "../../../components/section"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"

const EditDoubt = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
    }, [router])

    return (
        <Layout title="Edit Doubt">
            <Heading as='h2' size='xl'>
                Edit Doubt
            </Heading>
            <Section>
                <form>
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
                            <Button type='submit'>Edit Doubt</Button>
                        </Flex>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default EditDoubt
export { getServerSideProps } from '../../../components/chakra'