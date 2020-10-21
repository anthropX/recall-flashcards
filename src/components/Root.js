import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../store'

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Root
