import React from 'react'

const DarkModeSwitch = () => {
  return (
    <label
      htmlFor='switch__input'
      className='switch my-md-0 align-self-md-center'
      aria-hidden='true'>
      <input type='checkbox' id='switch__input' className='switch__input' />
      <div className='switch__slider'>
        <div className='switch__knob'>
          <i className='switch__image switch__image--light fas fa-sun' />
          <i className='switch__image switch__image--dark fas fa-star-and-crescent' />
        </div>
      </div>
    </label>
  )
}

export default DarkModeSwitch
