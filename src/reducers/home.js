// import createReducer from '../utils/createReducer';
import { handleActions } from 'redux-actions';
// import * as types from '../constans/ActionTypes';

const home = handleActions({
    GET_HOME: (state, action) => ({ copyList: action.payload.home }),
}, {
    // 初始值
    home: [],
});
export default home;
