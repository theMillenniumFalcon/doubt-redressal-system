import { Heading, Box, Stack, Flex, Text, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Horizontal from '../components/Horizontal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseURL } from '../constants/baseURL'
import { useDispatch, useSelector } from 'react-redux'
import { getDoubts } from '../actions/doubts'

const Home = () => {
  const router = useRouter()
  const [comments, setComments] = useState([])
  const [answers, setAnswers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDoubts())
  }, [dispatch])

  const doubts = useSelector((state) => state.doubts)

  useEffect(() => {
    const getData = async () => {

      try {
        const comments = await axios.get(`${baseURL}/api/doubtComments`)
        const answers = await axios.get(`${baseURL}/api/doubtAnswer`)
        setComments(comments.data)
        setAnswers(answers.data)
      } catch (error) {
        localStorage.removeItem("authToken")
        router.replace('/')
      }
    }
    getData()
  }, [router])

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
                    <Link href={`/doubt/${item._id}`}>
                      {item.title}?
                    </Link>
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
                    Asked by: {item.creatorId?.firstname} {item.creatorId?.lastname} on{' '}
                    {new Date(item?.createdAt).getDate()}{'-'}
                    {new Date(item?.createdAt).getMonth() + 1}{'-'}
                    {new Date(item?.createdAt).getFullYear()}{','}{' '}{'at'}{' '}
                    {item?.createdAt.substring(11, 16)}
                  </Text>
                </Box>
                {item.answer === undefined ? null : (
                  <Box>
                    {answers?.answers?.map((_item) => !answers.answers ? null : (
                      <>
                        {item._id === _item.doubtId ? (
                          <Box py={4} px={4} key={_item._id}>
                            <Text fontSize='md' align="left">
                              <Text as="b">Answer:</Text>{' '}
                              {_item.answer}
                            </Text>
                            <Text fontSize='sm' align="left" mt={2}>
                              Answered by:{' '}
                              {_item.userId?.firstname} {_item.userId?.lastname} {' '}
                              {new Date(_item?.createdAt).getDate()}{'-'}
                              {new Date(_item?.createdAt).getMonth() + 1}{'-'}
                              {new Date(_item?.createdAt).getFullYear()}{','}{' '}{'at'}{' '}
                              {_item?.createdAt.substring(11, 16)}
                            </Text>
                          </Box>
                        ) : null}
                      </>
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
                      <>
                        {_item.doubtId === item._id ? (
                          <Box borderWidth="1px" m={4} p={2} key={_item._id}>
                            {_item.userId.firstname}: {_item.comment}
                          </Box>
                        ) : null}
                      </>
                    ))}
                  </Box>
                )}
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
