import { combineReducers } from 'redux'
import switchReducer from './switch'
import alertsReducer from './alerts'
import decksPageReducer from './decksPage'

export default combineReducers({
  isDark: switchReducer,
  alerts: alertsReducer,
  decksPage: decksPageReducer,
})
