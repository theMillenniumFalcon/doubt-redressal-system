import { FETCH_USER } from '../constants/actionTypes/user'

// eslint-disable-next-line import/no-anonymous-default-export
export default (users = [], action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload
        default:
            return users
    }
}
