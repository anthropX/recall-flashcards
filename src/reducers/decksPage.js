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
    case SET_DECK:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? { ...deck, name: payload.deckName, desc: payload.deckDesc }
            : deck,
        ),
      }
    case REMOVE_DECK:
      return {
        ...state,
        decks: state.decks.filter((deck, deckIndex) => deckIndex !== payload),
      }
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
    case ADD_CARD_TO_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload
            ? {
                ...deck,
                buckets: {
                  ...deck.buckets,
                  new: [...deck.buckets.new, deck.cards.length - 1],
                },
              }
            : deck,
        ),
      }
    case REMOVE_CARD_FROM_BUCKETS:
      return {
        ...state,
        decks: state.decks.map((deck, deckIndex) =>
          deckIndex === payload.deckIndex
            ? {
                ...deck,
                buckets: {
                  new: deck.buckets.new.filter(
                    (newCardIndex) => newCardIndex !== payload.cardIndex,
                  ),
                  highFreq: deck.buckets.highFreq.filter(
                    (highFreqCardIndex) =>
                      highFreqCardIndex !== payload.cardIndex,
                  ),
                  mdFreq: deck.buckets.mdFreq.filter(
                    (mdFreqCardIndex) => mdFreqCardIndex !== payload.cardIndex,
                  ),
                  lowFreq: deck.buckets.lowFreq.filter(
                    (lowFreqCardIndex) =>
                      lowFreqCardIndex !== payload.cardIndex,
                  ),
                  mastered: deck.buckets.mastered.filter(
                    (masteredCardIndex) =>
                      masteredCardIndex !== payload.cardIndex,
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
