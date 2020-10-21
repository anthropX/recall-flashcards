import { combineReducers } from 'redux'
import switchReducer from './switch'

export default combineReducers({
  isDark: switchReducer,
})
