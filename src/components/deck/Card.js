import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import editorConfig from '../../ckEditorConfig'

const Card = ({
  deckIndex,
  cardIndex,
  card: { question, answerTitle, answerDesc, answerImage },
}) => {
  return (
    <div className='cards__card pb-4 mt-n2'>
      <p className='mb-1'>{cardIndex + 1}.</p>
      <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
        <div className='card__side card-front d-flex align-items-center mr-0 mr-md-3 mb-3 mb-lg-0 p-2'>
          <div className='card-front__canvas d-flex justify-content-center align-items-center w-100 h-100'>
            <CKEditor
              id='card-front__question'
              editor={BalloonEditor}
              data={question}
              config={editorConfig}
              disabled
            />
          </div>
        </div>
        <div className='card__side card-back d-flex flex-column'>
          <div className='card-back__canvas flex-grow-1 d-flex flex-column w-100 h-100'>
            <div className='card-back__row d-flex justify-content-between align-items-stretch'>
              <CKEditor
                id='card-back__title'
                editor={BalloonEditor}
                data={answerTitle}
                config={editorConfig}
                disabled
              />
              <div
                className='card-back__image mr-2 mt-2'
                style={{ backgroundImage: `url(${answerImage})` }}
              />
            </div>
            <CKEditor
              id='card-back__desc'
              editor={BalloonEditor}
              data={answerDesc}
              config={editorConfig}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='card__buttons'>
        <Link
          to={`/decks/${deckIndex}/cards/${cardIndex}/update`}
          className='btn btn-outline-danger mr-2'>
          Edit Card
        </Link>
        <Button variant='outline-danger'>Delete Card</Button>
      </div>
    </div>
  )
}

Card.propTypes = {
  deckIndex: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  card: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answerTitle: PropTypes.string.isRequired,
    answerImage: PropTypes.string.isRequired,
    answerDesc: PropTypes.string.isRequired,
  }).isRequired,
}

export default Card
