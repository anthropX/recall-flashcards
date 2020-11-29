import {
  SET_DECK_INDEX,
  SET_DECKS,
  ADD_DECK,
  SET_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_CARD,
  DELETE_CARD,
  SET_BUCKETS,
  ADD_CARD_TO_BUCKETS,
  REMOVE_CARD_FROM_BUCKETS,
} from './types'

export function setDeckIndex(deckIndex) {
  return {
    type: SET_DECK_INDEX,
    payload: deckIndex,
  }
}

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    payload: decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    payload: deck,
  }
}

export function setDeck(deck) {
  return {
    type: SET_DECK,
    payload: deck,
  }
}

export function removeDeck(deckIndex) {
  return {
    type: REMOVE_DECK,
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

export function setBuckets(buckets) {
  return {
    type: SET_BUCKETS,
    payload: buckets,
  }
}

export function addCardToBuckets(deckIndex) {
  return {
    type: ADD_CARD_TO_BUCKETS,
    payload: deckIndex,
  }
}

export function removeCardFromBuckets(deckIndex) {
  return {
    type: REMOVE_CARD_FROM_BUCKETS,
    payload: deckIndex,
  }
}
