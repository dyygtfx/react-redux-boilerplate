// import createReducer from '../utils/createReducer';
import { handleActions } from 'redux-actions';
// import * as types from '../constans/ActionTypes';

const about = handleActions({
    GET_HOME: (state, action) => ({ about: action.payload.about }),
}, {
    // 初始值
    about: null,
});
export default about;
