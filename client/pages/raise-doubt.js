import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Layout from "../components/layouts/article"
import Section from "../components/section"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { useDispatch } from "react-redux"
import { createDoubt } from '../actions/doubts'

const RaiseDoubt = () => {
    const router = useRouter()
    const [creator, setCreator] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
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
                router.push('/')
            }

        }
        getData()
    }, [router])

    console.log(creator._id)

    const [doubtData, setDoubtData] = useState({
        title: '',
        description: '',
        creatorId: creator._id
    })

    const dispatch = useDispatch()

    // const raiseDoubtHandler = async (e) => {
    //     e.preventDefault()
    //     const config = {
    //         header: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //         },
    //     }

    //     try {
    //         await axios.post(`${baseURL}/api/doubt`, {
    //             title,
    //             description,
    //             creatorId: creator._id
    //         },
    //             config
    //         )

    //         router.push("/")
    //     } catch (error) {
    //         setError(error.response.data.error)
    //         setTimeout(() => {
    //             setError("")
    //         }, 5000)
    //     }
    // }

    const raiseDoubtHandler = (e) => {
        e.preventDefault()
        dispatch(createDoubt(doubtData))
        router.push('/')
    }

    return (
        <Layout title="Raise Doubt">
            <Heading as='h2' size='xl'>
                Raise Doubt
            </Heading>
            <Section>
                <form onSubmit={raiseDoubtHandler}>
                    <Box w="100%">
                        {error && <Text color="red">{error}</Text>}
                        <Box mt={4}>
                            <Text mb={1}>Title</Text>
                            <Input 
                            placeholder="title" 
                            value={doubtData.title} 
                            onChange={(e) => setDoubtData({ ...doubtData, title: e.target.value})} />
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Description</Text>
                            <Input
                            placeholder="description" 
                            value={doubtData.description} 
                            onChange={(e) => setDoubtData({ ...doubtData, description: e.target.value})} />
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