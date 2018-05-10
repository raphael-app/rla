import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import restaurants from './restaurants'
import auth from './auth'
import init from './init'

export default combineReducers({
  routing: routerReducer,
  restaurants,
  auth,
  init
})