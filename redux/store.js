import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

export const initStore = (initialState = {
  shop: {
    profile: { exception_task: [] },
  },
}) => {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
};
