import {
  SET_DECK_INDEX,
  SET_DECKS,
  ADD_DECK,
  ADD_CARD,
  SET_CARD,
  DELETE_CARD,
  SET_BUCKETS,
} from '../actions/types'

const initialState = {
  deckIndex: -1,
  decks: [],
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_DECK_INDEX:
      return { ...state, deckIndex: payload }
    case SET_DECKS:
      return { ...state, decks: payload }
    case ADD_DECK:
      return { ...state, decks: [...state.decks, payload] }
    case ADD_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: [...deck.cards, payload.card],
              }
            : deck,
        ),
      }
    case SET_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: deck.cards.map((card, cardIndex) =>
                  cardIndex === payload.cardIndex
                    ? {
                        ...payload.card,
                      }
                    : card,
                ),
              }
            : deck,
        ),
      }
    case DELETE_CARD:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                cards: deck.cards.filter(
                  (card, cardIndex) => cardIndex !== payload.cardIndex,
                ),
              }
            : deck,
        ),
      }
    case SET_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                buckets: payload.buckets,
              }
            : deck,
        ),
      }
    default:
      return state
  }
}
