import { SHOW_ALERT, HIDE_ALERT } from './types'

export const showAlert = (variant, message) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(hideAlert())
    }, 10000)
    dispatch({
      type: SHOW_ALERT,
      payload: { variant, message },
    })
  }
}

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  }
}
