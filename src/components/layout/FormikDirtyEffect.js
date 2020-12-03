import { connect } from 'formik'
import { useEffect } from 'react'

const FormikDirtyEffect = ({ onDirtyChange, formik: { dirty } }) => {
  useEffect(() => onDirtyChange(dirty), [onDirtyChange, dirty])
  return null
}

export default connect(FormikDirtyEffect)
