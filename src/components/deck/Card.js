import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Card = ({
  index,
  card: { question, answerTitle, answerDesc, answerImage },
}) => {
  return (
    <div className='cards__card pb-4 mt-n2'>
      <p className='mb-1'>{index + 1}.</p>
      <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
        <div className='card__side card-front d-flex align-items-center mr-0 mr-md-3 mb-3 mb-lg-0'>
          <div className='card-front__canvas d-flex justify-content-center align-items-center w-100 h-100 p-3'>
            <p className='card-front__question mb-0'>{question}</p>
          </div>
        </div>
        <div className='card__side card-back d-flex flex-column'>
          <div className='card-back__canvas flex-grow-1 d-flex flex-column w-100 h-100 p-3'>
            <div className='card-back__row d-flex justify-content-between align-items-center mb-3'>
              <p className='card-back__title pr-1 mb-0'>{answerTitle}</p>
              <div
                className='card-back__image'
                style={{ backgroundImage: `url(${answerImage})` }}
              />
            </div>
            <div className='card-back__desc flex-grow-1 d-flex flex-column justify-content-center pt-1'>
              <p>{answerDesc}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='card__buttons'>
        <Link
          to='/decks/0/cards/0/update'
          className='btn btn-outline-danger mr-2'>
          Edit Card
        </Link>
        <Button variant='outline-danger'>Delete Card</Button>
      </div>
    </div>
  )
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answerTitle: PropTypes.string.isRequired,
    answerImage: PropTypes.string.isRequired,
    answerDesc: PropTypes.string.isRequired,
  }).isRequired,
}

export default Card
