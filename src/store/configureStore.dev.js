/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from '../reducers';


const logger = createLogger({
    level: 'info',
    collapsed: true,
});

const router = routerMiddleware(browserHistory);

const configureStore = preloadedState => {
    const store = createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(
        applyMiddleware(promiseMiddleware, router, logger),
      )
    );

    if (module.hot) {
    // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};


export default configureStore;
