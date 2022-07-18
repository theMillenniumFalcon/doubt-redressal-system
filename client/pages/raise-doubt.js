import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Layout from "../components/layouts/article"
import Section from "../components/section"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { useDispatch, useSelector } from 'react-redux'
import { createDoubt } from '../actions/doubts'
import { getUser } from '../actions/users'

const RaiseDoubt = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    let errorBody = null

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const user = useSelector((state) => state.users)

    const [doubtData, setDoubtData] = useState({
        title: '',
        description: '',
        creatorId: ''
    })

    if (user._id) {
        doubtData.creatorId = user._id
    }

    if (doubtData.title === '') {
        errorBody = (
            <Text color="red">A doubt needs to have a title</Text>
        )
    } else if (doubtData.description === '') {
        errorBody = (
            <Text color="red">A doubt needs to have a description</Text>
        )
    } else if (doubtData.title === '' && doubtData.description === '') {
        errorBody = (
            <Text color="red">A doubt needs to have a title and a description</Text>
        )
    }
    

    const raiseDoubtHandler = (e) => {
        e.preventDefault()
        dispatch(createDoubt(doubtData))
        router.push('/')
    }

    return (
        <Layout title="Raise Doubt">
            <Heading as='h2' size='xl'>
                Raise Doubt
            </Heading>
            <Section>
                <form onSubmit={raiseDoubtHandler}>
                    <Box w="100%">
                        {errorBody}
                        <Box mt={4}>
                            <Text mb={1}>Title</Text>
                            <Input
                                placeholder="title"
                                value={doubtData.title}
                                onChange={(e) => setDoubtData({ ...doubtData, title: e.target.value })} />
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Description</Text>
                            <Input
                                placeholder="description"
                                value={doubtData.description}
                                onChange={(e) => setDoubtData({ ...doubtData, description: e.target.value })} />
                        </Box>
                        <Flex align="center" justify="space-between" mt={4}>
                            <Button type='submit'>Ask Doubt</Button>
                        </Flex>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default RaiseDoubt
export { getServerSideProps } from '../components/chakra'