import { Heading, Box, Stack, Flex, Text, Input } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Horizontal from '../components/Horizontal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseURL } from '../constants/baseURL'

const Home = () => {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [doubts, setDoubts] = useState([])
  const [comments, setComments] = useState([])
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const doubts = await axios.get(`${baseURL}/api/doubt`)
        const comments = await axios.get(`${baseURL}/api/doubtComments`)
        const answers = await axios.get(`${baseURL}/api/doubtAnswer`)
        setDoubts(doubts.data)
        setComments(comments.data)
        setAnswers(answers.data)
      } catch (error) {
        localStorage.removeItem("authToken")
        router.replace('/')
      }
    }
    getData()
  }, [router])

  const commentHandler = async (e) => {
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

  console.log(answers.answers)

  return (
    <Layout>
      {!doubts.doubts && !comments.comments ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Heading as='h2' size='xl'>
            Home
          </Heading>
          <Stack spacing={8} mt={4}>
            {doubts?.doubts?.map((item) => !doubts.doubts ? null : (
              <Box borderWidth="1px" key={item._id}>
                <Flex align="center" justify="space-between" p={4}>
                  <Heading as='h3' size='lg'>
                    {item.title}?
                  </Heading>
                  {item.answer === undefined ? null : (
                    <Box
                      border="1px solid #00FF00"
                      backgroundColor="rgba(0, 255, 0, 0.2)"
                      cursor="default"
                      py={0.5}
                      px={5}>
                      Resolved
                    </Box>
                  )}
                </Flex>
                <Text fontSize='md' p={4}>
                  {item.description}
                </Text>
                <Box p={4}>
                  <Text fontSize='sm' align="right">
                    Asked by: {item.creatorId.firstname} {item.creatorId.lastname} on Aug 7, 8: 36
                  </Text>
                </Box>
                {item.answer === undefined ? null : (
                  <Box>
                    {answers?.answers?.map((_item) => !answers.answers ? null : (
                      <Box py={4} px={4} key={_item._id}>
                        <Text fontSize='md' align="left">
                          <Text as="b">Answer:</Text>{' '}
                          {_item.answer}
                        </Text>
                        <Text fontSize='sm' align="left" mt={2}>
                          Answered by:{' '}
                          {_item.userId.firstname} {_item.userId.lastname} {' '}
                          on Aug 7, 8: 36
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )}
                <Horizontal />
                {item.comments.length === 0 ? null : (
                  <Box>
                    <Box>
                      <Text fontSize='md' pt={4} pl={4}>
                        {item.comments.length}{' '}
                        {item.comments.length === 1 ? (
                          <>Comment</>
                        ) : (
                          <>Comments</>
                        )}
                      </Text>
                    </Box>
                    {comments?.comments?.map((_item) => !comments.comments ? null : (
                      <Box borderWidth="1px" m={4} p={2} key={_item._id}>
                        {_item.userId.firstname}: {_item.comment}
                      </Box>
                    ))}
                  </Box>
                )}
                <form onSubmit={commentHandler}>
                  {error && <Text color="red">{error}</Text>}
                  <Flex px={4} my={4} align="center" justify="space-between">
                    <Input
                      variant='filled'
                      placeholder="Add Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)} />
                    <Box
                      border="1px solid #fff"
                      backgroundColor="rgba(255, 255, 255, 0.05)"
                      cursor="pointer"
                      ml={4}
                      py={1}
                      px={5}
                      type='submit'
                    >
                      Comment
                    </Box>
                  </Flex>
                </form>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
