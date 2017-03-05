// 路由配置表

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as containers from './containers';

const {
    App,
    Home,
    About,

} = containers;

const createRoutes = store => ( // eslint-disable-line
    <Route component={App}>
        <IndexRoute component={Home} />
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
    </Route>
);

export default createRoutes;
