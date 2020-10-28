import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Dashboard = ({ isDark }) => {
  const ColorStyle = () => {
    if (useLocation().pathname === '/' || isDark) return 'text-light'
    return 'text-dark'
  }
  return (
    <footer
      className={`position-absolute bg-transparent ${ColorStyle()} vw-100 text-center`}>
      <p>Recall © All Rights Reserved</p>
    </footer>
  )
}

Dashboard.propTypes = {
  isDark: PropTypes.bool.isRequired,
}

export default Dashboard
