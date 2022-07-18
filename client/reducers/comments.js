import { FETCH_ALL, CREATE, FETCH_ONE } from '../constants/actionTypes/comment'

// eslint-disable-next-line import/no-anonymous-default-export
export default (comments = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case FETCH_ONE:
            return action.payload
        case CREATE:
            return [...comments, action.payload]
        default:
            return comments
    }
}
