import { SET_SELECTED_DECK } from '../actions/types'

export default function (
  state = {
    name: '',
    desc: '',
    mastered: 0,
    total: 0,
  },
  { type, payload },
) {
  switch (type) {
    case SET_SELECTED_DECK:
      return payload
    default:
      return state
  }
}
