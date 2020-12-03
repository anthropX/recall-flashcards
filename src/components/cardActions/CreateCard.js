import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Prompt, withRouter } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import { v4 as uuidv4 } from 'uuid'
import { addCard, addCardToBuckets } from '../../actions/decks'
import editorConfig from '../../config/ckEditorConfig'
import processParams from '../layout/processParams'
import { showAlert } from '../../actions/alerts'

const CreateCard = ({
  showAlert,
  addCard,
  addCardToBuckets,
  history,
  deckId,
  deck,
}) => {
  // TODO: get cardId from API response
  const cardId = uuidv4()
  const initialValues = {
    question: '<h5>Your <i>question</i> goes in here.</h5>',
    answerTitle: '<h5>Your <i>answer heading</i> goes in here.&nbsp;</h5>',
    answerImage: '',
    answerDesc:
      '<p>Type your<strong> answer description</strong>. &nbsp;Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio sint consectetur veritatis sunt ab.</p><ol><li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li><li>Optio sint consectetur veritatis sunt ab asperiores.</li></ol>',
  }
  const [question, setQuestion] = useState(initialValues.question)
  const [answerTitle, setAnswerTitle] = useState(initialValues.answerTitle)
  const { answerImage } = initialValues
  const [answerDesc, setAnswerDesc] = useState(initialValues.answerDesc)
  useEffect(() => {
    window.onbeforeunload = isDirty() ? () => true : undefined
  })

  const handleSave = () => {
    addCard({
      deckId,
      card: { cardId, question, answerTitle, answerImage, answerDesc },
    })
    addCardToBuckets({ deckId, cardId })
    history.push(`/decks/${deckId}`)
    showAlert('success', `Card added to ${deck.name} deck!`)
  }

  const isDirty = () =>
    question !== initialValues.question ||
    answerTitle !== initialValues.answerTitle ||
    answerDesc !== initialValues.answerDesc ||
    answerImage !== initialValues.answerImage

  return (
    <>
      <Prompt
        when={isDirty()}
        message='You have unsaved changes, are you sure you want to leave?'
      />
      <div className='create-card'>
        <h1 className='display-5 mb-1'>{deck.name} Deck</h1>
        <p className='p1 mb-0 pr-0 pr-md-5'>{deck.desc}</p>
        <hr className='hr w-75 ml-0' />

        <h3 className='display-6'>Fill in details for your new card!</h3>
      </div>
      <div className='selected-card cards__card pb-4 mt-n2'>
        <div className='card__sides d-flex flex-column flex-lg-row pt-3 mt-3 mb-3'>
          <div className='card__side card-front d-flex align-items-center mr-0 mr-md-3 mb-3 mb-lg-0 p-2'>
            <div className='card-front__canvas d-flex align-items-center w-100 h-100'>
              <CKEditor
                id='card-front__question'
                editor={BalloonEditor}
                data={question}
                onChange={(event, editor) => setQuestion(editor.getData())}
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
                  data={answerTitle}
                  onChange={(event, editor) => setAnswerTitle(editor.getData())}
                  config={editorConfig}
                />
                <div
                  className='card-back__image image-upload-placeholder image-upload-placeholder--editable position-relative mr-2 mt-2'
                  tabIndex='-1'>
                  <div className='image-upload-placeholder__canvas d-flex justify-content-center align-items-center position-absolute w-100 h-100'>
                    <i className='fas fa-file-image fa-2x mr-2' />
                    <p className='p2 mb-0'>Upload Image</p>
                  </div>
                </div>
              </div>
              <CKEditor
                id='card-back__desc'
                editor={BalloonEditor}
                data={answerDesc}
                onChange={(event, editor) => setAnswerDesc(editor.getData())}
                config={editorConfig}
              />
            </div>
          </div>
        </div>
        <div className='selected-card__buttons'>
          <Link
            to={`/decks/${deckId}/`}
            className='btn btn-outline-secondary mr-2'>
            Discard Changes
          </Link>
          <Button variant='outline-danger' onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </>
  )
}

CreateCard.propTypes = {
  showAlert: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  addCardToBuckets: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deckId: PropTypes.string.isRequired,
  deck: PropTypes.shape({
    deckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        cardId: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        answerTitle: PropTypes.string.isRequired,
        answerImage: PropTypes.string.isRequired,
        answerDesc: PropTypes.string.isRequired,
      }),
    ).isRequired,
    buckets: PropTypes.shape({
      new: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      highFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mdFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      lowFreq: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      mastered: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export default withRouter(
  connect(null, { showAlert, addCard, addCardToBuckets })(
    processParams(CreateCard),
  ),
)
