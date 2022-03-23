import diet_ACTIONS from './dietTypes'

const initdietState = {
  dietItems: [],
  numberOfItems: 0,
  totalPrice: 0.0
}

const dietReducer = (state = initdietState, action) => {
  console.log(action)
  const { type, payload } = action
  switch (type) {
    case diet_ACTIONS.ADD_TO_diet:
      {
        if (payload.itemsToBuy === 0) return state
        if (state.dietItems.length === 0) {
          return {
            ...state,
            dietItems: [payload],
            numberOfItems: parseInt(payload.itemsToBuy),
            totalPrice: parseFloat(payload.variantPrice) * parseInt(payload.itemsToBuy)
          }
        }
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
        const updateddietItems = state.dietItems.map(product => {
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
            dietItems: [...updateddietItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        return {
          ...state,
          dietItems: updateddietItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }
    case diet_ACTIONS.UPDATE_TO_diet:
      {
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
        const updateddietItems = state.dietItems.map(product => {
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
            dietItems: [...updateddietItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        return {
          ...state,
          dietItems: updateddietItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case diet_ACTIONS.REMOVE_FROM_diet:
      {
        const productToRemove = state.dietItems.find(product => product.handle === payload.handle)
        const { itemsToBuy, variantPrice } = productToRemove

        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(variantPrice)
        const updateddietItems = state.dietItems.filter(product => product.handle !== payload.handle)
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)

        return {
          ...state,
          numberOfItems: newQuantity,
          dietItems: updateddietItems,
          totalPrice: newTotal
        }
      }

    case diet_ACTIONS.EMPTY_diet:
      return {
        ...state,
        dietItems: [],
        numberOfItems: 0
      }
    default: return state
  }
}

export default dietReducer