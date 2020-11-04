import { SET_DECK_INDEX, SET_CARD } from './types'

export function setDeckIndex(deckIndex) {
  return {
    type: SET_DECK_INDEX,
    payload: deckIndex,
  }
}

export function setCard(card) {
  return {
    type: SET_CARD,
    payload: card,
  }
}
