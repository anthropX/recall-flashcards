import { combineReducers } from 'redux'
import switchReducer from './switch'
import decksReducer from './decks'
import selectedDeckReducer from './selectedDeck'
import deckReducer from './deck'

export default combineReducers({
  isDark: switchReducer,
  decks: decksReducer,
  selectedDeck: selectedDeckReducer,
  deck: deckReducer,
})
