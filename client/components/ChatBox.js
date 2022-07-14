import { Box, Flex, Text } from "@chakra-ui/react"

export const ChatBox = () => {
    return (
        <Box border="1px solid #979797" p={2} width="70%" backgroundColor="rgba(255, 255, 255, 0.05)">
            <Flex align="baseline">
                <Text fontSize='md' fontWeight="bold">User</Text>
                <Text fontSize='xs' ml={2}>9:12 PM</Text>
            </Flex>
            <Box>
                <Text fontSize='md'>
                    If youre looking for random paragraphs, youve come to the
                    right place. When a random word or a random sentence quite
                    enough, the next logical step is to find a random paragraph
                </Text>
            </Box>
        </Box>
    )
}