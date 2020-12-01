import {
  SET_DECK_ID,
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
} from '../actions/types'

const initialState = {
  deckId: '',
  decks: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DECK_ID:
      return { ...state, deckId: payload }
    case SET_DECKS:
      return { ...state, decks: payload }
    case ADD_DECK:
      return { ...state, decks: [...state.decks, payload] }
    case SET_DECK:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? { ...deck, name: payload.deckName, desc: payload.deckDesc }
            : deck,
        ),
      }
    case REMOVE_DECK:
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.deckId !== payload),
      }
    case ADD_CARD:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                cards: [payload.card, ...deck.cards],
              }
            : deck,
        ),
      }
    case SET_CARD:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                cards: deck.cards.map((card) =>
                  card.cardId === payload.card.cardId ? payload.card : card,
                ),
              }
            : deck,
        ),
      }
    case DELETE_CARD:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                cards: deck.cards.filter(
                  (card) => card.cardId !== payload.cardId,
                ),
              }
            : deck,
        ),
      }
    case SET_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                buckets: payload.buckets,
              }
            : deck,
        ),
      }
    case RESET_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload
            ? {
                ...deck,
                buckets: {
                  new: deck.cards.map(({ cardId }) => cardId),
                  highFreq: [],
                  mdFreq: [],
                  lowFreq: [],
                  mastered: [],
                },
              }
            : deck,
        ),
      }
    case ADD_CARD_TO_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                buckets: {
                  ...deck.buckets,
                  new: [payload.cardId, ...deck.buckets.new],
                },
              }
            : deck,
        ),
      }
    case REMOVE_CARD_FROM_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.deckId === payload.deckId
            ? {
                ...deck,
                buckets: {
                  new: deck.buckets.new.filter(
                    (newCardId) => newCardId !== payload.cardId,
                  ),
                  highFreq: deck.buckets.highFreq.filter(
                    (highFreqCardId) => highFreqCardId !== payload.cardId,
                  ),
                  mdFreq: deck.buckets.mdFreq.filter(
                    (mdFreqCardId) => mdFreqCardId !== payload.cardId,
                  ),
                  lowFreq: deck.buckets.lowFreq.filter(
                    (lowFreqCardId) => lowFreqCardId !== payload.cardId,
                  ),
                  mastered: deck.buckets.mastered.filter(
                    (masteredCardId) => masteredCardId !== payload.cardId,
                  ),
                },
              }
            : deck,
        ),
      }
    default:
      return state
  }
}
