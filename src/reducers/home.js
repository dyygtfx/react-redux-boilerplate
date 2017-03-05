// import createReducer from '../utils/createReducer';
import { handleActions } from 'redux-actions';
// import * as types from '../constans/ActionTypes';

const home = handleActions({
    GET_HOME: (state, action) => ({ home: action.payload.home }),
}, {
    // 初始值
    home: null,
});
export default home;
