import { Heading, Box, Stack, Flex, Text } from '@chakra-ui/react'
import Horizontal from '../../components/Horizontal'
import Layout from '../../components/layouts/article'
import { Answer } from '../../components/answer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Doubt = () => {
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
    }, [router])

    return (
        <Layout title="Solve Doubts">
            <Heading as='h2' size='xl'>
                Solve Doubts
            </Heading>
            <Flex mt={4}>
                <Box borderWidth="1px" width="60%">
                    <Flex align="center" justify="space-between" p={4}>
                        <Heading as='h3' size='lg'>
                            How to do Ajax in Rails?
                        </Heading>
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
                </Box>
                <Answer />
            </Flex>
        </Layout>
    )
}

export default Doubt