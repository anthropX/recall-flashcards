import React from 'react'
import PropTypes from 'prop-types'

const DeckGraphic = ({ name }) => {
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
  name: PropTypes.string.isRequired,
}

export default DeckGraphic
