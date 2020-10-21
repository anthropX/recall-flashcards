import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import toggleDark from '../actions/switch'

const DarkModeSwitch = ({ toggleDark, isDark }) => {
  useEffect(() => {
    console.log('DarkModeSwitch useEffect!')
    if (localStorage.isDark === 'true') toggleDark()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = () => {
    localStorage.setItem('isDark', !isDark)
    toggleDark()
  }

  return (
    <label
      htmlFor='switch__input'
      className='switch my-md-0 align-self-md-center'
      aria-hidden='true'>
      <input
        type='checkbox'
        id='switch__input'
        className='switch__input'
        onChange={handleChange}
        checked={isDark}
      />
      <div className='switch__slider'>
        <div className='switch__knob'>
          <i className='switch__image switch__image--light fas fa-sun' />
          <i className='switch__image switch__image--dark fas fa-star-and-crescent' />
        </div>
      </div>
    </label>
  )
}

DarkModeSwitch.propTypes = {
  toggleDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isDark: state.isDark,
})

export default connect(mapStateToProps, { toggleDark })(DarkModeSwitch)
