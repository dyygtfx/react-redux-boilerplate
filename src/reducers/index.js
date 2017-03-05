import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import homeReducer from './home';
import aboutReducer from './about';


const rootReducer = combineReducers({
    // counter,
    homeReducer,
    aboutReducer,
    routing,
});


export default rootReducer;
