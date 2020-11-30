import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CardNew = ({ deckId }) => {
  return (
    <div className='create-new d-flex flex-column mt-3'>
      <Link
        to={`/decks/${deckId}/cards/new`}
        className='create-new__link p2 link--accented text-center order-last'>
        <div className='create-new__rect mt-2 d-flex justify-content-center align-items-center'>
          <div className='create-new__circle d-flex justify-content-center align-items-center'>
            <div className='create-new__plus' />
          </div>
        </div>
        Create new card
      </Link>
    </div>
  )
}

CardNew.propTypes = {
  deckId: PropTypes.string.isRequired,
}

export default CardNew
