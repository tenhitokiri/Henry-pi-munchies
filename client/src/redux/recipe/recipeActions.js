import RECIPE_ACTIONS from './recipeTypes'
import axios from 'axios';
import { API } from '../../env.jsx';

export const fetchRecipesRequest = () => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_REQUEST
    }
}

export const fetchRecipesSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS,
        payload: recipes
    }
}

export const fetchRecipeByIdSuccess = (recipe) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_ID_SUCCESS,
        payload: recipe
    }
}

export const fetchRecipesFailure = (error) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_FAILURE,
        payload: error
    }
}

export const fetchRecipes = () => {
    return (dispatch) => {
        dispatch(fetchRecipesRequest())
        let api = API + 'recipes'
        console.log(`fetchRecipes: ${api}`)
        axios.get(api)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipesSuccess(recipes))
            })
            .catch(error => {
                const msg = error.message
                dispatch(fetchRecipesFailure(msg))
            })
    }
}

export const fetchRecipeById = (id) => {
    console.log(`fetchRecipeById: ${id}`)
    return (dispatch) => {
        dispatch(fetchRecipesRequest())
        let api = API + 'recipes/' + id
        console.log(`fetchRecipes: ${api}`)
        axios.get(api)
            .then(response => {
                const recipes = response.data
                console.log(recipes)
                dispatch(fetchRecipeByIdSuccess(recipes))
            })
            .catch(error => {
                const msg = error.message
                dispatch(fetchRecipesFailure(msg))
            })
    }
}
