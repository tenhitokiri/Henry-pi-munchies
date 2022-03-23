import { createStore, applyMiddleware } from 'redux';
import allreducers from './RootReducer'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Create Redux store
const allMiddleware = applyMiddleware(thunk, logger);
const recipesStore = createStore(allreducers, composeWithDevTools(allMiddleware));
//const recipesStore = createStore(allreducers, applyMiddleware(logger));

export default recipesStore;
