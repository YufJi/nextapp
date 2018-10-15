
import { combineReducers } from 'redux';
import global from './global';

export const InitialState = {};

const rootReducer = combineReducers({
  global,
});

export default rootReducer;
