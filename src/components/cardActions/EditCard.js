import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import { setCard } from '../../actions/decksPage'
import editorConfig from '../../config/ckEditorConfig'
import Spinner from '../layout/Spinner'

const EditCard = ({
  setCard,
  match: {
    params: { deckIndex, cardIndex },
  },
  decks,
}) => {
  const deck = decks[deckIndex]
  const card = deck && deck.cards[cardIndex]

  const [question, setQuestion] = useState(card.question)
  const [answerTitle, setAnswerTitle] = useState(card.answerTitle)
  const { answerImage } = card
  const [answerDesc, setAnswerDesc] = useState(card.answerDesc)
  const handleSave = () => {
    setCard({
      deckIndex: parseInt(deckIndex, 10),
      cardIndex: parseInt(cardIndex, 10),
      card: { question, answerTitle, answerImage, answerDesc },
    })
  }

  return deck ? (
    <>
      <div className='edit-card'>
        <h1 className='display-5 mb-1'>{deck.name} Deck</h1>
        <p className='p1 mb-0 pr-0 pr-md-5'>{deck.desc}</p>
        <hr className='hr w-75 ml-0' />

        <h3 className='display-6'>Update card details</h3>
      </div>
      <div className='selected-card cards__card pb-4 mt-n2'>
        <div className='card__sides d-flex flex-column flex-lg-row pt-3 mt-3 mb-3'>
          <div className='card__side card-front d-flex align-items-center mr-0 mr-md-3 mb-3 mb-lg-0 p-2'>
            <div className='card-front__canvas d-flex align-items-center w-100 h-100'>
              <CKEditor
                id='card-front__question'
                editor={BalloonEditor}
                data={card.question}
                onBlur={(event, editor) => setQuestion(editor.getData())}
                config={editorConfig}
              />
            </div>
          </div>
          <div className='card__side card-back d-flex flex-column'>
            <div className='card-back__canvas flex-grow-1 d-flex flex-column w-100 h-100'>
              <div className='card-back__row d-flex justify-content-between align-items-stretch'>
                <CKEditor
                  id='card-back__title'
                  editor={BalloonEditor}
                  data={card.answerTitle}
                  onBlur={(event, editor) => setAnswerTitle(editor.getData())}
                  config={editorConfig}
                />
                {card.answerImage !== '' ? (
                  <div
                    className='card-back__image image-upload-placeholder--editable mr-2 mt-2'
                    style={{ backgroundImage: `url(${card.answerImage})` }}
                    tabIndex='-1'
                  />
                ) : (
                  <div
                    className='card-back__image image-upload-placeholder image-upload-placeholder--editable position-relative mr-2 mt-2'
                    tabIndex='-1'>
                    <div className='image-upload-placeholder__canvas d-flex justify-content-center align-items-center position-absolute w-100 h-100'>
                      <i className='fas fa-file-image fa-2x mr-2' />
                      <p className='p2 mb-0'>Upload Image</p>
                    </div>
                  </div>
                )}
              </div>
              <CKEditor
                id='card-back__desc'
                editor={BalloonEditor}
                data={card.answerDesc}
                onBlur={(event, editor) => setAnswerDesc(editor.getData())}
                config={editorConfig}
              />
            </div>
          </div>
        </div>
        <div className='selected-card__buttons'>
          <Link
            to={`/decks/${deckIndex}/`}
            className='btn btn-outline-secondary mr-2'>
            Back to Deck
          </Link>
          <Button variant='outline-danger' onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  )
}

EditCard.propTypes = {
  setCard: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
      cardIndex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answerTitle: PropTypes.string.isRequired,
          answerImage: PropTypes.string.isRequired,
          answerDesc: PropTypes.string.isRequired,
        }),
      ).isRequired,
      buckets: PropTypes.shape({
        new: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        highFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        mdFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        lowFreq: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        mastered: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps, { setCard })(EditCard)
