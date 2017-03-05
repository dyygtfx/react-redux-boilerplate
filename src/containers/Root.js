import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll'; // 打开新页面的时候滚到页面顶部

import createRoutes from '../createRoutes';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history} routes={createRoutes(store)} render={applyRouterMiddleware(useScroll())} />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};


export default Root;
