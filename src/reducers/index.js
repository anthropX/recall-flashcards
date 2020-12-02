import { combineReducers } from 'redux'
import switchReducer from './switch'
import alertsReducer from './alerts'
import decksReducer from './decks'

export default combineReducers({
  isDark: switchReducer,
  alerts: alertsReducer,
  decks: decksReducer,
})
