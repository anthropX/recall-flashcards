import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const FlippableCard = ({
  card: { question, answerTitle, answerDesc, answerImage },
}) => {
  return (
    <div className='flippable-card' tabIndex='-1'>
      <div className='flippable-card__front card__side card-front d-flex align-items-center p-2'>
        <div className='card-front__canvas d-flex justify-content-center align-items-center w-100 h-100'>
          {/* eslint-disable-next-line react/no-danger */}
          <p className='ck' dangerouslySetInnerHTML={{ __html: question }} />
        </div>
      </div>
      <div className='flippable-card__back card__side card-back d-flex flex-column'>
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
          {/* eslint-disable-next-line react/no-danger */}
          <p className='ck' dangerouslySetInnerHTML={{ __html: answerDesc }} />
        </div>
        <div className='play-buttons d-flex justify-content-stretch'>
          <Button variant='success' className='w-100 border-0 rounded-0'>
            I knew this!
          </Button>
          <Button variant='danger' className='w-100 border-0 rounded-0'>
            I didn&apos;t know
          </Button>
        </div>
      </div>
    </div>
  )
}

FlippableCard.propTypes = {
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answerTitle: PropTypes.string.isRequired,
    answerImage: PropTypes.string.isRequired,
    answerDesc: PropTypes.string.isRequired,
  }).isRequired,
}

export default FlippableCard
