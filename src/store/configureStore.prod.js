import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';


const router = routerMiddleware(browserHistory);

/**
 * Creates a preconfigured store.
 */
const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(promiseMiddleware, router)
  );


export default configureStore;
