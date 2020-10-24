import React from 'react'
import PropTypes from 'prop-types'

const DeckGraphic = ({ name }) => {
  return (
    <div className='deck-graphic my-3'>
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
