import { Box, Flex, Heading, Stack } from "@chakra-ui/react"
import Layout from "../components/layouts/article"

const SolveDoubts = () => {
    return (
        <Layout title="Solve Doubts">
            <Heading as='h2' size='xl'>
                Solve Doubts
            </Heading>
            <Stack spacing={8} mt={4}>
                <Flex align="center" justify="space-between" borderWidth="1px" px={6} py={4}>
                    <Heading as='h4' size='md'>
                        How to do Ajax in Rails?
                    </Heading>
                    <Box
                        border="1px solid #fff"
                        backgroundColor="rgba(255, 255, 255, 0.05)"
                        cursor="pointer"
                        mr={12}
                        py={1}
                        px={10}
                    >
                        Accept
                    </Box>
                </Flex>
            </Stack>
        </Layout>
    )
}

export default SolveDoubts
export { getServerSideProps } from '../components/chakra'