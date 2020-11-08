import { SET_DECK_INDEX, ADD_CARD, SET_CARD, DELETE_CARD } from './types'

export function setDeckIndex(deckIndex) {
  return {
    type: SET_DECK_INDEX,
    payload: deckIndex,
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: card,
  }
}

export function setCard(card) {
  return {
    type: SET_CARD,
    payload: card,
  }
}

export function deleteCard(payload) {
  return {
    type: DELETE_CARD,
    payload,
  }
}
