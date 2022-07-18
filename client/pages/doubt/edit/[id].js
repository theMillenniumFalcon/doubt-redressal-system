import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Layout from "../../../components/layouts/article"
import Section from "../../../components/section"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getOneDoubt } from '../../../actions/doubts'
import { editDoubt } from '../../../actions/doubts'

const EditDoubt = () => {
    const router = useRouter()
    const id = (router.asPath.split('/')[3])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneDoubt(id))
    }, [dispatch, id])

    const doubt = useSelector((state) => state.doubts)

    const [editDoubtData, setEditDoubtData] = useState({
        title: !doubt.doubt ? null : doubt.doubt.title,
        description: !doubt.doubt ? null : doubt.doubt.description,
    })

    console.log(editDoubtData)

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.push('/')
            router.reload()
        }
    }, [router])


    const editDoubtHandler = (e) => {
        e.preventDefault()
        dispatch(editDoubt(id, editDoubtData))
        router.push('/')
    }

    return (
        <Layout title="Edit Doubt">
            <Heading as='h2' size='xl'>
                Edit Doubt
            </Heading>
            <Section>
                <form onSubmit={editDoubtHandler}>
                    <Box w="100%">
                        <Box mt={4}>
                            <Text mb={1}>Title</Text>
                            <Input
                                placeholder="title"
                                value={editDoubtData.title}
                                onChange={(e) => setEditDoubtData({ ...editDoubtData, title: e.target.value })} />
                        </Box>
                        <Box mt={4}>
                            <Text mb={1}>Description</Text>
                            <Input
                                placeholder="description"
                                value={editDoubtData.description}
                                onChange={(e) => setEditDoubtData({ ...editDoubtData, description: e.target.value })} />
                        </Box>
                        <Flex align="center" justify="space-between" mt={4}>
                            <Button type='submit'>Edit Doubt</Button>
                        </Flex>
                    </Box>
                </form>
            </Section>
        </Layout>
    )
}

export default EditDoubt
export { getServerSideProps } from '../../../components/chakra' 