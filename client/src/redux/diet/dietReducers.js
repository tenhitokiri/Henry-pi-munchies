import DIET_ACTIONS from './dietTypes'

const initDietState = {
  dietItems: [],
  numberOfItems: 0,
  error: null,
  loading: false
}

/* const DIET_ACTIONS = {
    ADD_DIET_REQUEST: 'ADD_DIET_REQUEST',
    ADD_DIET_SUCCESS: 'ADD_DIET_SUCCESS',
    ADD_DIET_FAILURE: 'ADD_DIET_FAILURE',

    FETCH_ALL_DIETS_REQUEST: 'FETCH_ALL_DIETS_REQUEST',
    FETCH_ALL_DIETS_SUCCESS: 'FETCH_ALL_DIETS_SUCCESS',
    FETCH_ALL_DIETS_FAILURE: 'FETCH_ALL_DIETS_FAILURE',

    UPDATE_DIET_REQUEST: 'UPDATE_DIET_REQUEST',
    UPDATE_DIET_SUCCESS: 'UPDATE_DIET_SUCCESS',
    UPDATE_DIET_FAILURE: 'UPDATE_DIET_FAILURE',

    DELETE_DIET_REQUEST: 'DELETE_DIET_REQUEST',
    DELETE_DIET_SUCCESS: 'DELETE_DIET_SUCCESS',
    DELETE_DIET_FAILURE: 'DELETE_DIET_FAILURE',

}
 */

//TODO: Simplify this function
const dietReducer = (state = initDietState, action) => {
  const { type, payload } = action
  switch (type) {
    case DIET_ACTIONS.ADD_DIET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case DIET_ACTIONS.ADD_DIET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dietItems: [...state.dietItems, payload],
        numberOfItems: state.numberOfItems + 1,
      }
    case DIET_ACTIONS.ADD_DIET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    case DIET_ACTIONS.FETCH_ALL_DIETS_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case DIET_ACTIONS.FETCH_ALL_DIETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dietItems: payload,
        numberOfItems: payload.length,
      }
    case DIET_ACTIONS.FETCH_ALL_DIETS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    case DIET_ACTIONS.UPDATE_DIET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case DIET_ACTIONS.UPDATE_DIET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dietItems: state.dietItems.map(diet => {
          if (diet.id === payload.id) {
            return payload
          }
          return diet
        }),
      }
    case DIET_ACTIONS.UPDATE_DIET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    case DIET_ACTIONS.DELETE_DIET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case DIET_ACTIONS.DELETE_DIET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dietItems: state.dietItems.filter(diet => diet.id !== payload),
        numberOfItems: state.numberOfItems - 1,
      }
    case DIET_ACTIONS.DELETE_DIET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }
    default:
      return state
  }
}

export default dietReducer