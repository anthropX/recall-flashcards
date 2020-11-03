import { SET_DECK_INDEX } from '../actions/types'

export default function (
  state = {
    deckIndex: -1,
    decks: [
      {
        name: 'Periodic Table',
        desc:
          'Learn atomic numbers and classifications of elements of the periodic table',
        mastered: 27,
        total: 118,
      },
      {
        name: 'Asian Countries',
        desc: 'Learn capitals, flags, and other details about Asian countries',
        mastered: 19,
        total: 48,
      },
      {
        name: 'GRE Words',
        desc: 'Master the top 100 GRE words',
        mastered: 100,
        total: 100,
      },
      {
        name: 'Pokemon',
        desc: 'Memorize Pokedex numbers and types of the original 151 pokemons',
        mastered: 0,
        total: 151,
      },
    ],
  },
  { type, payload },
) {
  switch (type) {
    case SET_DECK_INDEX:
      return { ...state, deckIndex: payload }
    default:
      return state
  }
}
