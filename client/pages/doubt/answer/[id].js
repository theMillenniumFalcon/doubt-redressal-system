import { Heading, Box, Flex, Text, Button, Textarea } from '@chakra-ui/react'
import Horizontal from '../../../components/Horizontal'
import Layout from '../../../components/layouts/article'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../../constants/baseURL'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../actions/users'
import { createAnswer } from '../../../actions/answers'

const Doubt = () => {
    const router = useRouter()
    const [doubt, setDoubt] = useState({})
    const [comments, setComments] = useState([])
    const dispatch = useDispatch()

    const id = (router.asPath.split('/')[3])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const user = useSelector((state) => state.users)

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
                const doubt = await axios.get(`${baseURL}/api/doubt/${id}`, config)
                const comments = await axios.get(`${baseURL}/api/doubtComments/${id}/comments`, config)
                setDoubt(doubt.data)
                setComments(comments.data)
            } catch (error) {
                // localStorage.removeItem("authToken")
                // router.replace('/')
                console.log(error)
            }
        }
        getData()
    }, [router, id])

    const [answerData, setAnswerData] = useState({
        description: '',
        creatorId: user._id
    })

    const answerHandler = async (e) => {
        e.preventDefault()
        dispatch(createAnswer(id, answerData))
        router.push('/')
    }

    return (
        <Layout title="Solve Doubts">
            {!doubt.doubt && !user && !comments.doubtComments ? (
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
                                    {doubt.doubt?.title}?
                                </Heading>
                            </Flex>
                            <Text fontSize='md' p={4}>
                                {doubt.doubt?.description}
                            </Text>
                            <Box p={4}>
                                <Text fontSize='sm' align="right">
                                    Asked by:{' '}
                                    {doubt.doubt?.creatorId?.firstname} {doubt.doubt?.creatorId?.lastname} on{' '}
                                    {new Date(doubt.doubt?.createdAt).getDate()}{'-'}
                                    {new Date(doubt.doubt?.createdAt).getMonth() + 1}{'-'}
                                    {new Date(doubt.doubt?.createdAt).getFullYear()}{','}{' '}{'at'}{' '}
                                    {doubt.doubt?.createdAt.substring(11, 16)}
                                </Text>
                            </Box>
                            <Horizontal />
                            {doubt.doubt?.comments.length === 0 ? null : (
                                <Box>
                                    <Box>
                                        <Text fontSize='md' pt={4} pl={4}>
                                            {doubt.doubt?.comments.length}{' '}
                                            {doubt.doubt?.comments.length === 1 ? (
                                                <>Comment</>
                                            ) : (
                                                <>Comments</>
                                            )}
                                        </Text>
                                    </Box>
                                    {comments?.doubtComments?.map((item) => !comments.doubtComments ? null : (
                                        <Box borderWidth="1px" m={4} p={2} key={item._id}>
                                            {item.userId.firstname}: {item.comment}
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                        <Box ml={6} borderWidth="1px" width="40%" p={4}>
                            <form onSubmit={answerHandler}>
                                <Box mt={4}>
                                    <Text mb={1} as="b">Answer:</Text>
                                    <Textarea mt={2}
                                        placeholder="answer"
                                        value={answerData.answer}
                                        onChange={(e) => setAnswerData({ ...answerData, answer: e.target.value })} />
                                </Box>
                                <Box mt={4} align="right">
                                    <Button type='submit'>Answer</Button>
                                </Box>
                            </form>
                        </Box>
                    </Flex>
                </>
            )}
        </Layout>
    )
}

export default Doubt