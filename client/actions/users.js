import * as api from '../api'

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUser()
        dispatch({ type: 'FETCH_USER', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}