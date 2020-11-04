import { combineReducers } from 'redux'
import switchReducer from './switch'
import decksPageReducer from './decksPage'

export default combineReducers({
  isDark: switchReducer,
  decksPage: decksPageReducer,
})
