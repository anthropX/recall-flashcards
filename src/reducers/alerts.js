import { SHOW_ALERT, HIDE_ALERT } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload]
    case HIDE_ALERT:
      return state.filter((alert, index) => index !== 0)
    default:
      return state
  }
}
