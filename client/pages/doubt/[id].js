import { Heading, Box, Flex, Text, IconButton, Input, Button } from '@chakra-ui/react'
import Horizontal from '../../components/Horizontal'
import Layout from '../../components/layouts/article'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../constants/baseURL'
import { MdDelete } from "react-icons/md"
import NextLink from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { getOneDoubt, deleteDoubt } from '../../actions/doubts'
import { createComment } from '../../actions/comments'
import { getUser } from '../../actions/users'

const Doubt = () => {
    const router = useRouter()
    const [comments, setComments] = useState([])

    const id = (router.asPath.split('/')[2])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneDoubt(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const doubt = useSelector((state) => state.doubts)
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
                const comments = await axios.get(`${baseURL}/api/doubtComments/${id}/comments`, config)
                setComments(comments.data)
            } catch (error) {
                // localStorage.removeItem("authToken")
                // router.replace('/')
            }
        }
        getData()
    }, [router, id])

    const [commentData, setCommentData] = useState({
        comment: '',
        doubtId: '',
        userId: ''
    })

    if (id) {
        commentData.doubtId = id
    }

    if (user._id) {
        commentData.userId = user._id
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        dispatch(deleteDoubt(id))
        router.push('/')
    }

    const commentHandler = (e) => {
        e.preventDefault()
        dispatch(createComment(commentData))
        router.push('/')
    }

    return (
        <Layout title="Doubt">
            {!doubt.doubt ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Heading as='h2' size='xl'>
                        Solve Doubts
                    </Heading>
                    <Flex mt={4}>
                        <Box borderWidth="1px" width="100%">
                            <Flex align="center" justify="space-between" p={4}>
                                <Heading as='h3' size='lg'>
                                    {doubt.doubt.title}?
                                </Heading>
                                {user._id === doubt.doubt?.creatorId?._id ? (
                                    <Flex>
                                        <Button mr={2}>
                                            <NextLink href={`/doubt/edit/${id}`} passHref>Edit Recipe</NextLink>
                                        </Button>
                                        <IconButton icon={<MdDelete />} aria-label="Delete Post" onClick={deleteHandler} />
                                    </Flex>
                                ) : null}
                            </Flex>
                            <Text fontSize='md' p={4}>
                                {doubt.doubt.description}
                            </Text>
                            <Box p={4}>
                                <Text fontSize='sm' align="right">
                                    Asked by:{' '}
                                    {doubt.doubt.creatorId?.firstname} {doubt.doubt.creatorId?.lastname} {' '}
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
                                    {!comments.doubtComments ? (
                                        <Text>Loading...</Text>
                                    ) : (
                                        <>
                                            {comments?.doubtComments?.map((item) => !comments.doubtComments ? null : (
                                                <Box borderWidth="1px" m={4} p={2} key={item._id}>
                                                    {item.userId.firstname}: {item.comment}
                                                </Box>
                                            ))}
                                        </>
                                    )}
                                </Box>
                            )}
                            <form onSubmit={commentHandler}>
                                <Box px={4} my={4}>
                                    <Flex align="center" justify="space-between">
                                        <Input
                                            variant='filled'
                                            placeholder="Add Comment"
                                            value={commentData.comment}
                                            onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })} />
                                        <Button
                                            ml={4}
                                            type='submit'
                                        >
                                            Comment
                                        </Button>
                                    </Flex>
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