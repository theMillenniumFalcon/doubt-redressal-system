import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const fetchAllDoubtsURL = `${baseURL}/api/doubt`
const fetchOneDoubtURL = `${baseURL}/api/doubt`
const fetchAllCommentsURL = `${baseURL}/api/doubtComments`
const createDoubtURL = `${baseURL}/api/doubt`
const deleteDoubtURL = `${baseURL}/api/doubt`
const fetchUserURL = `${baseURL}`
const editDoubtURL = `${baseURL}/api/doubt`
const fetchAllAnswersURL = `${baseURL}/api/doubtAnswer`
const createAnswerURL = `${baseURL}/api/doubtAnswer`
const createCommentURL = `${baseURL}/api/doubtComments/comment/create`

export const fetchAllDoubts = () => axios.get(fetchAllDoubtsURL)
export const fetchOneDoubt = (id) => axios.get(`${fetchOneDoubtURL}/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
})
export const fetchAllComments = () => axios.get(fetchAllCommentsURL)
export const createDoubt = (newDoubt) => axios.post(createDoubtURL, newDoubt, {
    headers: {
        "Content-Type": "application/json"
    },
})
export const deleteDoubt = (id) => axios.delete(`${deleteDoubtURL}/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
})
export const fetchUser = () => axios.get(fetchUserURL, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
})
export const editDoubt = (id, editedDoubt) => axios.patch(`${editDoubtURL}/${id}`, editedDoubt, {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
})
export const fetchAllAnswers = () => axios.get(fetchAllAnswersURL)
export const createAnswer = (id, newAnswer) => axios.post(`${createAnswerURL}/${id}/answer/create`, newAnswer)
export const createComment = (newComment) => axios.post(createCommentURL, newComment, {
    headers: {
        "Content-Type": "application/json"
    },
})