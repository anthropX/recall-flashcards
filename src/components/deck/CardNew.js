import React from 'react'
import { Link } from 'react-router-dom'

const CardsNew = () => {
  return (
    <div className='create-new d-flex flex-column my-3'>
      <Link
        to='/decks/0/cards/new'
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

export default CardsNew
