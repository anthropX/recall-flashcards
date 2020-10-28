import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import setSelectedDeck from '../actions/selectedDeck'

const DeckGraphic = ({ setSelectedDeck, index, name, decks }) => {
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
    // Set selected deck
    setSelectedDeck(decks[index])
  }
  return (
    <div className='deck-graphic my-3' tabIndex='-1' onFocus={handleFocus}>
      <div className='deck-graphic__cards position-relative mt-2'>
        <div className='deck-graphic__card bg-white position-absolute' />
        <div className='deck-graphic__card bg-white position-absolute' />
        <div className='deck-graphic__card bg-white position-absolute' />
      </div>
      <p className='deck-graphic__name text-center mb-0'>{name}</p>
    </div>
  )
}

DeckGraphic.propTypes = {
  setSelectedDeck: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      mastered: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

export default connect(null, { setSelectedDeck })(DeckGraphic)
