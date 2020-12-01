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

export const setDeckId = (deckId) => ({
  type: SET_DECK_ID,
  payload: deckId,
})

export const setDecks = (decks) => ({
  type: SET_DECKS,
  payload: decks,
})

export const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck,
})

export const setDeck = (deck) => ({
  type: SET_DECK,
  payload: deck,
})

export const removeDeck = (deckId) => ({
  type: REMOVE_DECK,
  payload: deckId,
})

export const addCard = (card) => ({
  type: ADD_CARD,
  payload: card,
})

export const setCard = (card) => ({
  type: SET_CARD,
  payload: card,
})

export const deleteCard = (payload) => ({
  type: DELETE_CARD,
  payload,
})

export const setBuckets = (buckets) => ({
  type: SET_BUCKETS,
  payload: buckets,
})

export const addCardToBuckets = (card) => ({
  type: ADD_CARD_TO_BUCKETS,
  payload: card,
})

export const removeCardFromBuckets = (card) => ({
  type: REMOVE_CARD_FROM_BUCKETS,
  payload: card,
})
