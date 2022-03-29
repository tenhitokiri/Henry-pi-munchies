import DIET_ACTIONS from './dietTypes'
import axios from 'axios';
import { API } from '../../env.jsx';

//TODO: Simplify this code, use a generic function (type, payload) for most of the actions regarding the reducer

// Fetch all diets
export const fetchDietsRequest = () => {
    return {
        type: DIET_ACTIONS.FETCH_ALL_DIETS_REQUEST
    }
}

export const fetchDietsSuccess = (diets) => {
    return {
        type: DIET_ACTIONS.FETCH_ALL_DIETS_SUCCESS,
        payload: diets
    }
}

export const fetchDietsFailure = (error) => {
    return {
        type: DIET_ACTIONS.FETCH_ALL_DIETS_FAILURE,
        payload: error
    }
}

export const fetchDiets = () => {
    return (dispatch) => {
        dispatch(fetchDietsRequest())
        let api = API + 'diets/'
        console.log(`fetchDiets: ${api}`)
        axios.get(api)
            .then(response => {
                const diets = response.data
                console.log(`fetchDiets: ${diets.length} diets`)
                dispatch(fetchDietsSuccess(diets))
            })
            .catch(error => {
                const msg = error.message
                console.log(error)
                dispatch(fetchDietsFailure(msg))

            })
    }
}

//Add a Diet
export const addDietRequest = () => {
    return {
        type: DIET_ACTIONS.ADD_DIET_REQUEST
    }
}

export const addDietSuccess = (diets) => {
    return {
        type: DIET_ACTIONS.ADD_DIET_SUCCESS,
        payload: diets
    }
}

export const addDietFailure = (error) => {
    return {
        type: DIET_ACTIONS.ADD_DIET_FAILURE,
        payload: error
    }
}

export const addDiet = (payload) => {
    return (dispatch) => {
        dispatch(addDietRequest())
        let api = API + 'diets'
        console.log(`updating Diet with id ${payload.name} to: ${api}`)
        axios.post(api, payload)
            .then(response => {
                const diet = response.data
                dispatch(addDietSuccess(diet))
            })
            .catch(error => {
                const msg = error.message
                dispatch(addDietFailure(msg))
            })
    }
}

// Update a single diet
export const updateDietRequest = () => {
    return {
        type: DIET_ACTIONS.UPDATE_DIET_REQUEST
    }
}

export const updateDietSuccess = (diets) => {
    return {
        type: DIET_ACTIONS.UPDATE_DIET_SUCCESS,
        payload: diets
    }
}

export const updateDietFailure = (error) => {
    return {
        type: DIET_ACTIONS.UPDATE_DIET_FAILURE,
        payload: error
    }
}

export const updateDiet = (payload) => {
    return (dispatch) => {
        dispatch(updateDietRequest())
        let api = API + 'diets'
        console.log(`updating Diet with id ${payload.id} to: ${api}`)
        axios.put(api, payload)
            .then(response => {
                const diet = response.data
                dispatch(updateDietSuccess(diet))
            })
            .catch(error => {
                const msg = error.message
                dispatch(updateDietFailure(msg))
            })
    }

}

//Remove the diet
export const deleteDietRequest = () => {
    return {
        type: DIET_ACTIONS.DELETE_DIET_REQUEST
    }
}

export const deleteDietSuccess = (diets) => {
    return {
        type: DIET_ACTIONS.DELETE_DIET_SUCCESS,
        payload: diets
    }
}

export const deleteDietFailure = (error) => {
    return {
        type: DIET_ACTIONS.DELETE_DIET_FAILURE,
        payload: error
    }
}

export const deleteDiet = (diet) => {
    return (dispatch) => {
        dispatch(deleteDietRequest())
        let api = API + 'diets/' + diet.id
        console.log(`deleting Diet with id ${diet.id} to: ${api}`)
        axios.delete(api, diet)
            .then(response => {
                const diet = response.data
                dispatch(deleteDietSuccess(diet))
            })
            .catch(error => {
                const msg = error.message
                dispatch(deleteDietFailure(msg))
            })
    }
}
