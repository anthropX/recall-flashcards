import React from 'react'
import PropTypes from 'prop-types'

const DeckGraphic = ({
  handleDeckGraphicFocus,
  deckId,
  name,
  isDeckGraphicOpened,
}) => {
  return (
    <div
      className={`deck-graphic ${
        isDeckGraphicOpened && 'deck-graphic--opened'
      } my-3`}
      tabIndex='-1'
      onFocus={() => handleDeckGraphicFocus(deckId)}>
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
  handleDeckGraphicFocus: PropTypes.func.isRequired,
  deckId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDeckGraphicOpened: PropTypes.bool.isRequired,
}

export default DeckGraphic
