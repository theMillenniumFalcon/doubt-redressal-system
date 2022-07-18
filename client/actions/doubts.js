import * as api from '../api'

export const getDoubts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllDoubts()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        localStorage.removeItem("authToken")
    }
}

export const getOneDoubt = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchOneDoubt(id)
        dispatch({ type: 'FETCH_ONE', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
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

export const editDoubt = (id, doubt) => async (dispatch) => {
    try {
        const { data } = await api.editDoubt(id, doubt)
        dispatch({ type: 'EDIT', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}

export const deleteDoubt = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteDoubt(id)
        dispatch({ type: 'DELETE', payload: data })
    } catch (error) {
        // localStorage.removeItem("authToken")
        console.log(error)
    }
}