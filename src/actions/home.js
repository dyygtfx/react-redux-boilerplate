import { createAction } from 'redux-actions';
import * as types from '../constans/ActionTypes';
import * as homeService from '../services/homeService';

export const getHomeService = createAction(types.GET_HOME, (params) => homeService.getHomeData(params));

// export const getCopyList = createAction(types.GET_HOME, (params) => getHomeService.getCopyList(params));

