import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import Card from './Card'

const Cards = ({ deckIndex, deckName, cards }) => {
  return (
    <div className='cards mt-4'>
      {cards.map((card, cardIndex) => (
        <Card
          key={uuidv4()}
          deckIndex={deckIndex}
          deckName={deckName}
          cardIndex={cardIndex}
          card={card}
        />
      ))}
    </div>
  )
}

Cards.propTypes = {
  deckIndex: PropTypes.string.isRequired,
  deckName: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answerTitle: PropTypes.string.isRequired,
      answerImage: PropTypes.string.isRequired,
      answerDesc: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Cards
