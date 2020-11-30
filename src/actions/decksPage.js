import {
  SET_DECK_ID,
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

export function setDeckId(deckId) {
  return {
    type: SET_DECK_ID,
    payload: deckId,
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

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    payload: deckId,
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

export function addCardToBuckets(card) {
  return {
    type: ADD_CARD_TO_BUCKETS,
    payload: card,
  }
}

export function removeCardFromBuckets(card) {
  return {
    type: REMOVE_CARD_FROM_BUCKETS,
    payload: card,
  }
}
