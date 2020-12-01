import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import PropTypes from 'prop-types'
import DismissibleAlert from './DismissibleAlert'

const Alerts = ({ alerts }) => {
  return (
    <div className='alerts'>
      {alerts.map((alert) => (
        <DismissibleAlert key={uuid4()} alert={alert} />
      ))}
    </div>
  )
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      variant: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alerts,
})

export default connect(mapStateToProps)(Alerts)
