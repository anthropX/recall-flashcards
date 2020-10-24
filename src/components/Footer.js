import React from 'react'
import PropTypes from 'prop-types'

const Dashboard = ({ isDark }) => {
  return (
    <footer
      className={`position-absolute bg-transparent text-${
        isDark ? 'light' : 'dark'
      } vw-100 text-center`}>
      <p>Recall © All Rights Reserved</p>
    </footer>
  )
}

Dashboard.propTypes = {
  isDark: PropTypes.bool.isRequired,
}

export default Dashboard
