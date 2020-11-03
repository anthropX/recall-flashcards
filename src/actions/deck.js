import { SET_CARD } from './types'

export default function setCard(card) {
  return {
    type: SET_CARD,
    payload: card,
  }
}
