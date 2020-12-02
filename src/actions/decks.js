import {
  SET_DECKS,
  ADD_DECK,
  SET_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_CARD,
  DELETE_CARD,
  RESET_BUCKETS,
  SET_BUCKETS,
  ADD_CARD_TO_BUCKETS,
  REMOVE_CARD_FROM_BUCKETS,
} from './types'

export const setDecks = (decks) => ({
  type: SET_DECKS,
  payload: decks,
})

export const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck,
})

export const setDeck = ({ deckId, deckName, deckDesc }) => ({
  type: SET_DECK,
  payload: { deckId, deckName, deckDesc },
})

export const removeDeck = (deckId) => ({
  type: REMOVE_DECK,
  payload: deckId,
})

export const addCard = ({ deckId, card }) => ({
  type: ADD_CARD,
  payload: { deckId, card },
})

export const setCard = ({ deckId, card }) => ({
  type: SET_CARD,
  payload: { deckId, card },
})

export const deleteCard = ({ deckId, cardId }) => ({
  type: DELETE_CARD,
  payload: { deckId, cardId },
})

export const resetBuckets = (deckId) => ({
  type: RESET_BUCKETS,
  payload: deckId,
})

export const setBuckets = ({ deckId, buckets }) => ({
  type: SET_BUCKETS,
  payload: { deckId, buckets },
})

export const addCardToBuckets = ({ deckId, cardId }) => ({
  type: ADD_CARD_TO_BUCKETS,
  payload: { deckId, cardId },
})

export const removeCardFromBuckets = ({ deckId, cardId }) => ({
  type: REMOVE_CARD_FROM_BUCKETS,
  payload: { deckId, cardId },
})
