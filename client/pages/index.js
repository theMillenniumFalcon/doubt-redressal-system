import {
  Heading,
  Box,
  Stack,
  Flex,
  Text,
  Input
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Horizontal from '../components/Horizontal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const Home = () => {
  const [comment, setComment] = useState("")
  const [doubts, setDoubts] = useState([])
  const [creator, setCreator] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try {
        const doubts = await axios.get(`${baseURL}/api/doubt`, config)
        setDoubts(doubts.data)
      } catch (error) {
        // localStorage.removeItem("authToken")
        // router.replace('/')
        console.log(error)
      }
    }
    getData()
  }, [])

  // {doubts?.doubts?.map((item) => !doubts.doubts ? null : (
  //   console.log(item.creatorId)
  // ))}

  // useEffect(() => {
  //   const getCreator = async () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     }

  //     try {
  //       {doubts?.doubts?.map(async (item) => !doubts.doubts ? null : (
  //         await axios.get(`${baseURL}/api/user/${item.creatorId}`, config)
  //       ))}
  //       setCreator(creator.data)
  //     } catch (error) {
  //       console.log('Creator_Error', error)
  //     }
  //   }
  //   getCreator()
  // })

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

  return (
    <Layout>
      {!doubts.doubts ? (
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
                  {item.answer === "" ? null : (
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
                    Asked by: Nishank Priydarshi on Aug 7, 8: 36
                  </Text>
                </Box>
                {item.answer === "" ? null : (
                  <Box pt={4} px={4}>
                    <Text fontSize='md' align="left">
                      <Text as="b">Answer:</Text>{' '}
                      {item.answer}
                    </Text>
                    <Text fontSize='sm' align="left" mt={2}>
                      Answered by Nishank Priydarshi on Aug 7, 8: 36
                    </Text>
                  </Box>
                )}
                <Horizontal />
                <Box>
                  <Text fontSize='md' pt={4} pl={4}>
                    2 Comments
                  </Text>
                </Box>
                <Stack spacing={3}>
                  <Box borderWidth="1px" m={4} p={2}>
                    Jake: Nice one, I have also the same doubt!
                  </Box>
                </Stack>
                <form onSubmit={commentHandler}>
                {error && <Text color="red">{error}</Text>}
                  <Flex px={4} mb={4} align="center" justify="space-between">
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
