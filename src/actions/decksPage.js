import { SET_DECK_INDEX } from './types'

export default function setDeckIndex(deckIndex) {
  return {
    type: SET_DECK_INDEX,
    payload: deckIndex,
  }
}
