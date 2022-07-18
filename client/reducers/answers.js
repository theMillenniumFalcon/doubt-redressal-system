import { FETCH_ALL, CREATE } from '../constants/actionTypes/answer'

// eslint-disable-next-line import/no-anonymous-default-export
export default (answers = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...answers, action.payload]
        default:
            return answers
    }
}
