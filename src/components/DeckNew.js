import React from 'react'
import { Link } from 'react-router-dom'

const DeckNew = () => {
  return (
    <div className='create-new d-flex flex-column my-3'>
      <Link
        to='/decks/new'
        className='create-new__link p2 link--accented text-center order-last'>
        <div className='create-new__rect mt-2 d-flex justify-content-center align-items-center'>
          <div className='create-new__circle d-flex justify-content-center align-items-center'>
            <div className='create-new__plus' />
          </div>
        </div>
        Create new deck
      </Link>
    </div>
  )
}

export default DeckNew
