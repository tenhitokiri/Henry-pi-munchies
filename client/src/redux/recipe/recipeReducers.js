import RECIPE_ACTIONS from './recipeTypes'

const recipeState = {
    recipeItems: [],
    numberOfItems: 0,
}

/* 
    const RECIPE_ACTIONS = {
    ADD_RECIPE: 'ADD_RECIPE',
    UPDATE_RECIPE: 'UPDATE_RECIPE',
    REMOVE_RECIPE: 'REMOVE_RECIPE',
    EMPTY_RECIPE: 'EMPTY_RECIPE'
}
 */
const recipeReducer = (state = recipeState, action) => {
    console.log(action)
    const { type, payload } = action
    switch (type) {
        case RECIPE_ACTIONS.ADD_TO_recipe:
            {
                if (payload.itemsToBuy === 0) return state
                if (state.recipeItems.length === 0) {
                    return {
                        ...state,
                        recipeItems: [payload],
                        numberOfItems: parseInt(payload.itemsToBuy),
                        totalPrice: parseFloat(payload.variantPrice) * parseInt(payload.itemsToBuy)
                    }
                }
                let oldQty = 0
                let oldPrice = 0.0
                let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
                const updatedrecipeItems = state.recipeItems.map(product => {
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
                const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
                if (oldQty === 0) {
                    return {
                        ...state,
                        recipeItems: [...updatedrecipeItems, payload],
                        numberOfItems: newQuantity,
                        totalPrice: newTotal
                    }
                }
                return {
                    ...state,
                    recipeItems: updatedrecipeItems,
                    numberOfItems: newQuantity,
                    totalPrice: newTotal
                }
            }
        case RECIPE_ACTIONS.UPDATE_TO_recipe:
            {
                let oldQty = 0
                let oldPrice = 0.0
                let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
                const updatedrecipeItems = state.recipeItems.map(product => {
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
                const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
                if (oldQty === 0) {
                    return {
                        ...state,
                        recipeItems: [...updatedrecipeItems, payload],
                        numberOfItems: newQuantity,
                        totalPrice: newTotal
                    }
                }
                return {
                    ...state,
                    recipeItems: updatedrecipeItems,
                    numberOfItems: newQuantity,
                    totalPrice: newTotal
                }
            }

        case RECIPE_ACTIONS.REMOVE_FROM_recipe:
            {
                const productToRemove = state.recipeItems.find(product => product.handle === payload.handle)
                const { itemsToBuy, variantPrice } = productToRemove

                const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(variantPrice)
                const updatedrecipeItems = state.recipeItems.filter(product => product.handle !== payload.handle)
                const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)

                return {
                    ...state,
                    numberOfItems: newQuantity,
                    recipeItems: updatedrecipeItems,
                    totalPrice: newTotal
                }
            }

        case RECIPE_ACTIONS.EMPTY_recipe:
            return {
                ...state,
                recipeItems: [],
                numberOfItems: 0
            }
        default: return state
    }
}

export default recipeReducer