import { Button, Flex, IconButton } from "@chakra-ui/react"
import NextLink from 'next/link'
import { MdDelete } from "react-icons/md"
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseURL } from "../constants/baseURL"

export const EditDeleteBtn = () => {
    const router = useRouter()
    const id = (router.asPath.split('/')[2])

    const deleteHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
        await axios.delete(`${baseURL}/doubt/${id}`, config)
        router.replace('/')
    }
    
    return (
        <Flex>
            <Button mr={2}>
                <NextLink href={`/doubt/edit/${id}`} passHref>Edit Recipe</NextLink>
            </Button>
            <IconButton icon={<MdDelete />} aria-label="Delete Post" onClick={deleteHandler} />
        </Flex>
    )
}