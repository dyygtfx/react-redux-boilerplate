import { createAction } from 'redux-actions';
import * as types from '../constans/ActionTypes';
import * as aboutService from '../services/aboutService';

export const getAboutService = createAction(types.GET_ABOUT, (params) => aboutService.getAboutData(params));

// export const getCopyList = createAction(types.GET_HOME, (params) => getHomeService.getCopyList(params));

