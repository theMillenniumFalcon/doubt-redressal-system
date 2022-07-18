import { FETCH_ALL, CREATE, EDIT, DELETE, FETCH_ONE } from '../constants/actionTypes/doubt'

// eslint-disable-next-line import/no-anonymous-default-export
export default (doubts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case FETCH_ONE:
            return action.payload
        case CREATE:
            return [...doubts, action.payload]
        case EDIT:
            return doubts.map((doubt) => (doubt._id === action.payload._id ? action.payload : doubt))
        case DELETE:
            return doubts.filter((doubt) => doubt._id !== action.payload)
        default:
            return doubts
    }
}
