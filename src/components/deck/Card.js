import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DeleteCardButton from './DeleteCardButton'

const Card = ({
  deckIndex,
  deckName,
  cardIndex,
  card: { question, answerTitle, answerDesc, answerImage },
}) => {
  return (
    <div className='cards__card pb-4 mt-n2'>
      <p className='mb-1'>{cardIndex + 1}.</p>
      <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
        <div className='card__side card-front d-flex align-items-center mr-0 mr-md-3 mb-3 mb-lg-0 p-2'>
          <div className='card-front__canvas d-flex justify-content-center align-items-center w-100 h-100'>
            {/* eslint-disable-next-line react/no-danger */}
            <p className='ck' dangerouslySetInnerHTML={{ __html: question }} />
          </div>
        </div>
        <div className='card__side card-back d-flex flex-column'>
          <div className='card-back__canvas flex-grow-1 d-flex flex-column w-100 h-100'>
            <div className='card-back__row d-flex justify-content-between align-items-stretch'>
              {/* eslint-disable react/no-danger */}
              <p
                className='ck'
                dangerouslySetInnerHTML={{ __html: answerTitle }}
              />
              {/* eslint-enable react/no-danger */}
              {answerImage !== '' ? (
                <div
                  className='card-back__image mr-2 mt-2'
                  style={{ backgroundImage: `url(${answerImage})` }}
                />
              ) : (
                <div className='card-back__image image-upload-placeholder position-relative mr-2 mt-2 invisible'>
                  <div className='image-upload-placeholder__canvas d-flex justify-content-center align-items-center position-absolute w-100 h-100'>
                    <i className='fas fa-file-image fa-2x mr-2' />
                    <p className='p2 mb-0'>Upload Image</p>
                  </div>
                </div>
              )}
            </div>
            {/* eslint-disable react/no-danger */}
            <p
              className='ck'
              dangerouslySetInnerHTML={{ __html: answerDesc }}
            />
            {/* eslint-enable react/no-danger */}
          </div>
        </div>
      </div>
      <div className='card__buttons'>
        <Link
          to={`/decks/${deckIndex}/cards/${cardIndex}/update`}
          className='btn btn-outline-danger mr-2'>
          Edit Card
        </Link>
        <DeleteCardButton
          deckName={deckName}
          deckIndex={deckIndex}
          cardIndex={cardIndex}
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  deckIndex: PropTypes.string.isRequired,
  deckName: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answerTitle: PropTypes.string.isRequired,
    answerImage: PropTypes.string.isRequired,
    answerDesc: PropTypes.string.isRequired,
  }).isRequired,
}

export default Card
