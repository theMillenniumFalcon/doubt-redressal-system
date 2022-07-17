import { Box, Text } from "@chakra-ui/react"

export const ChatBox = ({ item }) => {
    console.log(item)
    return (
        <Box
            border="1px solid #979797"
            p={2}
            width="40%"
            backgroundColor={item.fromSelf ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.2)"}
            mb={4}
            borderRadius={8}
        >
            <Text fontSize='md'>
                {item.message}
            </Text>
        </Box>
    )
}