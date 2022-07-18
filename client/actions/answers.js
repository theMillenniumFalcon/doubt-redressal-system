import * as api from '../api'

export const getAnswers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllAnswers()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}

export const createAnswer = (id, answer) => async (dispatch) => {
    try {
        const { data } = await api.createAnswer(id, answer)
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}