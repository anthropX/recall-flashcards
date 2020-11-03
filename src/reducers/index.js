import { combineReducers } from 'redux'
import switchReducer from './switch'
import decksPageReducer from './decksPage'
import deckReducer from './deck'

export default combineReducers({
  isDark: switchReducer,
  decksPage: decksPageReducer,
  deck: deckReducer,
})
