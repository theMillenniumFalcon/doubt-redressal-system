import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const fetchAllDoubtsURL = `${baseURL}/api/doubt`
const fetchAllCommentsURL = `${baseURL}/api/doubtComments`
const createDoubtURL = `${baseURL}/api/doubt`

export const fetchAllDoubts = () => axios.get(fetchAllDoubtsURL)
export const fetchAllComments = () => axios.get(fetchAllCommentsURL)
export const createDoubt = (newDoubt) => axios.post(createDoubtURL, newDoubt)