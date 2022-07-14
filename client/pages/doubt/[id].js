import { Heading, Box, Flex, Text, Button, IconButton } from '@chakra-ui/react'
import Horizontal from '../../components/Horizontal'
import Layout from '../../components/layouts/article'
import { Answer } from '../../components/answer'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../constants/baseURL'
import NextLink from 'next/link'
import { MdDelete } from "react-icons/md"

const Doubt = () => {
    const router = useRouter()
    const [user, setUser] = useState("")
    const [doubt, setDoubt] = useState({})

    const id = (router.asPath.split('/')[2])

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
                const user = await axios.get(`${baseURL}`, config)
                const doubt = await axios.get(`${baseURL}/api/doubt/${id}`, config)
                setDoubt(doubt.data)
                setUser(user.data)
            } catch (error) {
                // localStorage.removeItem("authToken")
                // router.replace('/')
                console.log(error)
            }
        }
        getData()
    }, [router, id])

    const deleteHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
        await axios.delete(`${baseURL}/api/doubt/${id}`, config)
        router.replace('/')
    }

    return (
        <Layout title="Solve Doubts">
            {!doubt.doubt ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Heading as='h2' size='xl'>
                        Solve Doubts
                    </Heading>
                    <Flex mt={4}>
                        <Box borderWidth="1px" width="60%">
                            <Flex align="center" justify="space-between" p={4}>
                                <Heading as='h3' size='lg'>
                                    {doubt.doubt.title}?
                                </Heading>
                                {user._id === doubt.doubt.creatorId._id ? (
                                    <>
                                        <Flex>
                                            <Button mr={2}>
                                                <NextLink href={`/doubt/edit/${id}`} passHref>Edit Recipe</NextLink>
                                            </Button>
                                            <IconButton icon={<MdDelete />} aria-label="Delete Post" onClick={deleteHandler} />
                                        </Flex>
                                    </>
                                ) : null}
                            </Flex>
                            <Text fontSize='md' p={4}>
                                {doubt.doubt.description}
                            </Text>
                            <Box p={4}>
                                <Text fontSize='sm' align="right">
                                    Asked by:{' '}
                                    {doubt.doubt.creatorId.firstname} {doubt.doubt.creatorId.lastname} {' '}
                                    on Aug 7, 8: 36{' '}
                                    {doubt.doubt.createdAt}
                                </Text>
                            </Box>
                            <Horizontal />
                            {doubt.doubt.comments.length === 0 ? null : (
                                <Box>
                                    <Box>
                                        <Text fontSize='md' pt={4} pl={4}>
                                            {doubt.doubt.comments.length}{' '}
                                            {doubt.doubt.comments.length === 1 ? (
                                                <>Comment</>
                                            ) : (
                                                <>Comments</>
                                            )}
                                        </Text>
                                    </Box>
                                    {doubt?.doubt?.comments?.map((item) => !doubt.doubt.comments ? null : (
                                        <Box borderWidth="1px" m={4} p={2} key={item._id}>
                                            Jake: {item.comment}
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                        <Answer />
                    </Flex>
                </>
            )}
        </Layout>
    )
}

export default Doubt