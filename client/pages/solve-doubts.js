import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import Layout from "../components/layouts/article"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseURL } from '../constants/baseURL'

const SolveDoubts = () => {
    const router = useRouter()
    const [user, setUser] = useState("")
    const [doubts, setDoubts] = useState([])

    useEffect(() => {
        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }

            try {
                const user = await axios.get(`${baseURL}`, config)
                const doubts = await axios.get(`${baseURL}/api/doubt`, config)
                setUser(user.data)
                setDoubts(doubts.data)
            } catch (error) {
                localStorage.removeItem("authToken")
                router.replace('/')
            }
        }
        getData()
    }, [router])

    // console.log(doubts.doubts)

    return (
        <Layout title="Solve Doubts">
            {!doubts.doubts ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {user.role === "ta" ? (
                        <>
                            <Heading as='h2' size='xl'>
                                Solve Doubts
                            </Heading>
                            {doubts.doubts.filter(item => item.answer === undefined).length === 0 && (
                                <Text mt={4}>All doubts are solved</Text>
                            )}
                            <Stack spacing={8} mt={4}>
                                {doubts?.doubts?.filter(item => item.answer === undefined).map((item) => !doubts.doubts ? null : (
                                    <Box>
                                        <Box key={item._id}>
                                            <Flex align="center" justify="space-between" borderWidth="1px" px={6} py={4}>
                                                <Heading as='h4' size='md'>
                                                    {item.title}?
                                                </Heading>
                                                <Link href={`/doubt/${item._id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <Box
                                                        border="1px solid #fff"
                                                        backgroundColor="rgba(255, 255, 255, 0.05)"
                                                        cursor="pointer"
                                                        py={1}
                                                        px={10}>
                                                        Accept
                                                    </Box>
                                                </Link>
                                            </Flex>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </>
                    ) : (
                        <Heading as='h4' size='md'>
                            You need to be a teaching assistant to see this page!
                        </Heading>
                    )}
                </>
            )}
        </Layout>
    )
}

export default SolveDoubts
export { getServerSideProps } from '../components/chakra'
