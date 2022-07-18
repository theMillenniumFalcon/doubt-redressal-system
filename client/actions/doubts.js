import * as api from '../api'

export const getDoubts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllDoubts()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        localStorage.removeItem("authToken")
    }
}

export const createDoubt = (doubt) => async (dispatch) => {
    try {
        const { data } = await api.createDoubt(doubt)
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}