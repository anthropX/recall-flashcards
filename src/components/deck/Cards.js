import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import Card from './Card'

const Cards = ({ cards }) => {
  return (
    <div className='cards mt-4'>
      {cards.map((card, index) => (
        <Card key={uuidv4()} index={index} card={card} />
      ))}
    </div>
  )
}

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answerTitle: PropTypes.string.isRequired,
      answerImage: PropTypes.string.isRequired,
      answerDesc: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default Cards
