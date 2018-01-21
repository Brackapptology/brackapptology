import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import activeUser from './activeUser'
import espnRPI from './espnRPI';
import espnBPI from './espnBPI';
import confChamps from './confChamps';
import currentUserBrackets from './currentUserBrackets';
import userLastFours from './userLastFours';
import userPageInfo from './userPage';
import userPageBracket from './userPageBracket';
import urlBracket from './urlBracket';
import inactiveUser from './inactiveUser';

const reducer = combineReducers({
  activeUser,
  espnRPI,
  espnBPI,
  confChamps,
  currentUserBrackets,
  userLastFours,
  userPageInfo,
  userPageBracket,
  urlBracket,
  inactiveUser
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './activeUser';
export * from './espnRPI';
export * from './espnBPI';
export * from './confChamps';
export * from './currentUserBrackets';
export * from './userLastFours';
export * from './userPage';
export * from './userPageBracket';
export * from './urlBracket';
export * from './inactiveUser';
