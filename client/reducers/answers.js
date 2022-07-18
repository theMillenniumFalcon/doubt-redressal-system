import { FETCH_ALL, CREATE } from '../constants/actionTypes/answer'

export const reducer = (doubts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...doubts, action.payload]
        default:
            return doubts
    }
}
