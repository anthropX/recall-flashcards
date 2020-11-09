import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import { addCard } from '../../actions/decksPage'
import editorConfig from '../../ckEditorConfig'

const CreateCard = ({
  addCard,
  history,
  match: {
    params: { deckIndex },
  },
  decks,
}) => {
  const { name, desc } = decks[deckIndex]

  const cardPlaceholder = {
    question: '<h5>Your <i>question</i> goes in here.</h5>',
    answerTitle: '<h5>Your <i>answer heading</i> goes in here.&nbsp;</h5>',
    answerImage: '',
    answerDesc:
      '<p>Type your<strong> answer description</strong>. &nbsp;Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio sint consectetur veritatis sunt ab.</p><ol><li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li><li>Optio sint consectetur veritatis sunt ab asperiores.</li></ol>',
  }

  const getEditorData = (selector) =>
    document.querySelector(selector).innerHTML.toString()

  const handleSave = () => {
    addCard({
      deckIndex: parseInt(deckIndex, 10),
      card: {
        question: getEditorData('.card-front .ck'),
        answerTitle: getEditorData('.card-back__row .ck'),
        answerImage: '',
        answerDesc: getEditorData('.card-back__row + .ck'),
      },
    })
    history.push(`/decks/${deckIndex}`)
  }

  return (
    <>
      <div className='create-card'>
        <h1 className='display-5 mb-1'>{name} Deck</h1>
        <p className='p1 mb-0 pr-0 pr-md-5'>{desc}</p>
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
                data={cardPlaceholder.question}
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
                  data={cardPlaceholder.answerTitle}
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
                data={cardPlaceholder.answerDesc}
                config={editorConfig}
              />
            </div>
          </div>
        </div>
        <div className='selected-card__buttons'>
          <Link
            to={`/decks/${deckIndex}/`}
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
  addCard: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      mastered: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answerTitle: PropTypes.string.isRequired,
          answerImage: PropTypes.string.isRequired,
          answerDesc: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decksPage.decks,
})

export default withRouter(connect(mapStateToProps, { addCard })(CreateCard))
