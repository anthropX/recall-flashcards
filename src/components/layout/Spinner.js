import React from 'react'
import spinnerImg from '../../img/spinner.svg'

const Spinner = () => {
  return (
    <div className='spinner-layout position-fixed d-flex justify-content-center align-items-center'>
      <img className='spinner position-relative' src={spinnerImg} alt='' />
    </div>
  )
}

export default Spinner
