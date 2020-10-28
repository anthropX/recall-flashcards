import { SET_SELECTED_DECK } from './types'

export default function setSelectedDeck(newDeck) {
  return {
    type: SET_SELECTED_DECK,
    payload: newDeck,
  }
}
