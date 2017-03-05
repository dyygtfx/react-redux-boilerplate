// import createReducer from '../utils/createReducer';
import { handleActions } from 'redux-actions';
// import * as types from '../constans/ActionTypes';

const about = handleActions({
    GET_HOME: (state, action) => ({ copyList: action.payload.about }),
}, {
    // 初始值
    about: {},
});
export default about;
