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
import { useState } from 'react'

const Home = () => {
  const [comment, setComment] = useState("")

  return (
    <Layout>
      <Stack spacing={8}>
        <Box borderWidth="1px">
          <Flex align="center" justify="space-between" p={4}>
            <Heading as='h3' size='lg'>
              How to do Ajax in Rails?
            </Heading>
            <Box
              border="1px solid #00FF00"
              backgroundColor="rgba(0, 255, 0, 0.2)"
              cursor="default"
              py={0.5}
              px={5}>
              Resolved
            </Box>
          </Flex>
          <Text fontSize='md' p={4}>
            An HSLA color value is specified with: hsla(hue,
            saturation, lightness, alpha), where the alpha
            parameter defines the opacity. The alpha parameter
            is a number between 0.0 (fully transparent) and
            1.0 (fully opaque).
          </Text>
          <Box p={4}>
            <Text fontSize='sm' align="right">
              Asked by: Nishank Priydarshi on Aug 7, 8: 36
            </Text>
          </Box>
          <Box pt={4} px={4}>
            <Text fontSize='md' align="left">
              <Text as="b">Answer:</Text>{' '}
              An HSLA color value is specified with: hsla(hue,
              saturation, lightness, alpha),
            </Text>
            <Text fontSize='sm' align="left" mt={2}>
              Answered by Nishank Priydarshi on Aug 7, 8: 36
            </Text>
          </Box>
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
            >
              Comment
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
