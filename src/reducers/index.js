import { combineReducers } from 'redux'
import switchReducer from './switch'
import decksReducer from './decks'
import deckReducer from './deck'

export default combineReducers({
  isDark: switchReducer,
  decks: decksReducer,
  deck: deckReducer,
})
