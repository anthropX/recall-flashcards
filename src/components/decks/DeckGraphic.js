import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import setDeckIndex from '../../actions/decksPage'

const DeckGraphic = ({ setDeckIndex, index, name }) => {
  const handleFocus = (event) => {
    document
      .querySelector('.fluid-overlay')
      .classList.add('fluid-overlay--overlaid')
    // Remove deck-graphic--opened from previously focused deck-graphic
    document
      .querySelectorAll('.decks .deck-graphic')
      .forEach((graphic) => graphic.classList.remove('deck-graphic--opened'))
    // Add deck-graphic--opened to currently focused deck-graphic
    event.target.classList.add('deck-graphic--opened')
    // Hide Reset
    document.querySelector('.fluid-box').classList.remove('fluid-box--reset')
    // Set selected deck
    setDeckIndex(index)
  }
  return (
    <div className='deck-graphic my-3' tabIndex='-1' onFocus={handleFocus}>
      <div className='deck-graphic__cards position-relative mt-2'>
        <div className='deck-graphic__card position-absolute' />
        <div className='deck-graphic__card position-absolute' />
        <div className='deck-graphic__card position-absolute' />
      </div>
      <p className='deck-graphic__name text-center mb-0'>{name}</p>
    </div>
  )
}

DeckGraphic.propTypes = {
  setDeckIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default connect(null, { setDeckIndex })(DeckGraphic)
