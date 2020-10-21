import { TOGGLE_DARK } from '../actions/types'

export default function (state = false, { type }) {
  switch (type) {
    case TOGGLE_DARK:
      return !state
    default:
      return state
  }
}
