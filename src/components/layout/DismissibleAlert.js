import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

const DismissibleAlert = ({ alert: { variant, message } }) => {
  const [show, setShow] = useState(true)
  return (
    show && (
      <Alert
        className='alert p15'
        variant={variant}
        onClose={() => setShow(false)}
        dismissible>
        {message}
      </Alert>
    )
  )
}

DismissibleAlert.propTypes = {
  alert: PropTypes.shape({
    variant: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
}

export default DismissibleAlert
