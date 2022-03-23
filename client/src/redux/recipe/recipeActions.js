import RECIPE_ACTIONS from './recipeTypes'
import axios from 'axios';

export const fetchProductsRequest = () => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_REQUEST
    }
}

export const fetchProductsSuccess = (products) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS,
        payload: products
    }
}

export const fetchProductsFailure = (error) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_FAILURE,
        payload: error
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsRequest())
        axios.get('https://staging.haciendola.dev/backend/test-front/api/products/')
            .then(response => {
                const products = response.data
                dispatch(fetchProductsSuccess(products))
            })
            .catch(error => {
                const msg = error.message
                dispatch(fetchProductsFailure(msg))
            })
    }
}
