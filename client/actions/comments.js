import * as api from '../api'

export const getComments = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllComments()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        localStorage.removeItem("authToken")
    }
}