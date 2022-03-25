import RECIPE_ACTIONS from './recipeTypes'

const recipeState = {
    recipes: [],
    loading: "",
    error: "",
    numberOfRecipes: 0
}

const recipeReducer = (state = recipeState, action) => {
    //console.log(action)
    const { type, payload } = action
    switch (type) {
        case RECIPE_ACTIONS.FETCH_RECIPE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: payload,
                numberOfRecipes: payload.length,
                error: ''
            }
        case RECIPE_ACTIONS.FETCH_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                recipes: [],
                error: action.payload
            }
        case RECIPE_ACTIONS.ADD_RECIPE:
            {
                if (payload.itemsToBuy === 0) return state
                if (state.recipes.length === 0) {
                    return {
                        ...state,
                        recipes: [payload],
                        numberOfRecipes: parseInt(payload.itemsToBuy),
                        totalPrice: parseFloat(payload.variantPrice) * parseInt(payload.itemsToBuy)
                    }
                }
                let oldQty = 0
                let oldPrice = 0.0
                let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
                const updatedRecipes = state.recipes.map(product => {
                    const {
                        handle, title,
                        variantInventoryQty,
                        variantPrice, imageSrc, itemsToBuy
                    } = product
                    if (handle === payload.handle) {
                        oldQty = parseInt(itemsToBuy)
                        oldPrice = parseFloat(variantPrice) * parseFloat(oldQty)
                        const updatedProd = {
                            handle, title,
                            variantInventoryQty,
                            variantPrice, imageSrc, itemsToBuy: payload.itemsToBuy
                        }
                        return updatedProd
                    }
                    return product
                }
                )
                const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
                const newQuantity = parseInt(state.numberOfRecipes) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
                if (oldQty === 0) {
                    return {
                        ...state,
                        recipes: [...updatedRecipes, payload],
                        numberOfRecipes: newQuantity,
                        totalPrice: newTotal
                    }
                }
                return {
                    ...state,
                    recipes: updatedRecipes,
                    numberOfRecipes: newQuantity,
                    totalPrice: newTotal
                }
            }
        case RECIPE_ACTIONS.UPDATE_RECIPE:
            {
                let oldQty = 0
                let oldPrice = 0.0
                let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
                const updatedRecipes = state.recipes.map(product => {
                    const {
                        handle, title,
                        variantInventoryQty,
                        variantPrice, imageSrc, itemsToBuy
                    } = product
                    if (handle === payload.handle) {
                        oldQty = parseInt(itemsToBuy)
                        oldPrice = parseFloat(variantPrice) * parseFloat(oldQty)
                        const updatedProd = {
                            handle, title,
                            variantInventoryQty,
                            variantPrice, imageSrc, itemsToBuy: payload.itemsToBuy
                        }
                        return updatedProd
                    }
                    return product
                }
                )
                const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
                const newQuantity = parseInt(state.numberOfRecipes) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
                if (oldQty === 0) {
                    return {
                        ...state,
                        recipes: [...updatedRecipes, payload],
                        numberOfRecipes: newQuantity,
                        totalPrice: newTotal
                    }
                }
                return {
                    ...state,
                    recipes: updatedRecipes,
                    numberOfRecipes: newQuantity,
                    totalPrice: newTotal
                }
            }
        case RECIPE_ACTIONS.REMOVE_RECIPE:
            {
                const productToRemove = state.recipes.find(product => product.handle === payload.handle)
                const { itemsToBuy, variantPrice } = productToRemove

                const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(variantPrice)
                const updatedRecipes = state.recipes.filter(product => product.handle !== payload.handle)
                const newQuantity = parseInt(state.numberOfRecipes) - parseInt(itemsToBuy)

                return {
                    ...state,
                    numberOfRecipes: newQuantity,
                    recipes: updatedRecipes,
                    totalPrice: newTotal
                }
            }
        default: return state
    }
}

export default recipeReducer