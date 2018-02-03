import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import activeUser from './activeUser'
import espnBPI from './espnBPI';
import kpi from './kpi';
import nolan from './nolan';
import currentUserBrackets from './currentUserBrackets';
import userLastFours from './userLastFours';
import userPageInfo from './userPage';
import userPageBracket from './userPageBracket';
import urlBracket from './urlBracket';
import inactiveUser from './inactiveUser';
import allUsers from './allUsers';
import displayEditUser from './displayEditUser';

const reducer = combineReducers({
  activeUser,
  espnBPI,
  kpi,
  nolan,
  currentUserBrackets,
  userLastFours,
  userPageInfo,
  userPageBracket,
  urlBracket,
  inactiveUser,
  allUsers,
  displayEditUser
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware);

export default store;
export * from './activeUser';
export * from './espnBPI';
export * from './kpi';
export * from './currentUserBrackets';
export * from './userLastFours';
export * from './userPage';
export * from './userPageBracket';
export * from './urlBracket';
export * from './inactiveUser';
export * from './allUsers';
export * from './displayEditUser';
export * from './nolan';
