import React from 'react'
import { useField } from 'formik'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const Input = ({ className, label, autoComplete, ...props }) => {
  const [field, meta] = useField(props)
  const { name, onChange, onBlur, value } = field
  const { type } = props
  return (
    <Form.Group controlId={name} className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && meta.error}
        autoComplete={autoComplete}
      />
      <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>
    </Form.Group>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
}

Input.defaultProps = {
  className: '',
  autoComplete: '',
}

export default Input
