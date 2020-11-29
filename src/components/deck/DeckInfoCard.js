import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { setDeckIndex, removeDeck } from '../../actions/decksPage'

const DeckInfoCard = ({
  setSidebarOverlaid,
  setDeckIndex,
  removeDeck,
  match: {
    params: { deckIndex },
  },
  history,
  deck: { name, desc, cards },
  isSidebarOverlaid,
}) => {
  const [comfirmation, setConfirmation] = useState('')
  const [isDeleteVisible, setDeleteVisible] = useState(false)

  const handleConfirmationSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (comfirmation === name) {
      removeDeck(parseInt(deckIndex, 10))
      setDeckIndex(-1)
      history.push('/decks')
    }
  }

  const handleSidebarClick = ({ target: { classList } }) =>
    (classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')) &&
    setSidebarOverlaid(false)

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`deck-fluid-overlay fluid-overlay ${
        isSidebarOverlaid && 'fluid-overlay--overlaid'
      }`}
      onClick={handleSidebarClick}
      onWheel={() => setSidebarOverlaid(false)}
      onTouchMove={() => setSidebarOverlaid(false)}>
      <div
        className={`fluid-box ${
          isDeleteVisible && 'fluid-box--delete'
        } pl-md-3 pr-md-0`}
        tabIndex='-1'>
        {name !== '' ? (
          <aside className='deck-infocard aside pl-md-3 pr-md-0'>
            <h6 className='h6 mt-0 d-md-none'>{name} Deck</h6>
            <div className='aside__close'>
              <i className='fas fa-times text-muted' />
            </div>
            <p className='p2 my-2 text-muted d-md-none'>
              ({cards.length} cards)
            </p>

            <p className='p1 mt-3 mb-0 d-md-none'>{desc}</p>
            <hr className='hr mt-2 mb-4 d-md-none ml-0' />
            <Row>
              <Col xs='3' md='4' className='pl-2 pr-0 flex-grow-0'>
                <Link
                  to={`/decks/${deckIndex}/update`}
                  className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                  <i className='aside__icon fas fa-edit' />
                  <p className='p2 mt-2 mb-0'>Rename</p>
                </Link>
              </Col>
              <Col className='pl-0 pr-md-3 flex-grow-0'>
                <button
                  className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'
                  type='button'
                  onClick={() => setDeleteVisible(true)}>
                  <i className='aside__icon fas fa-trash' />
                  <p className='p2 mt-2 mb-0 text-nowrap'>Delete</p>
                </button>
              </Col>
            </Row>
          </aside>
        ) : null}
        <aside className='decks-infocard aside pl-md-3 pr-md-0 d-flex flex-column'>
          <div className='aside__close'>
            <i className='fas fa-times text-muted' />
          </div>
          <p className='mr-5 mr-md-0'>
            Are you sure you want to{' '}
            <strong className='text-danger'>permanently delete</strong> this
            deck, including all cards and progress info?
          </p>
          <Form noValidate onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId='confirmation' className='mb-1'>
              <Form.Control
                type='text'
                value={comfirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
                isInvalid={comfirmation !== name}
                isValid={comfirmation === name}
              />
              <Form.Control.Feedback type='invalid'>
                Please type <strong>{name}</strong> to confirm
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant='outline-secondary'
              type='button'
              className='px-4 mt-2 mb-3 mr-2'
              onClick={() => setDeleteVisible(false)}>
              Cancel
            </Button>
            <Button
              variant='outline-danger'
              type='submit'
              className='px-4 mt-2 mb-3'>
              Confirm
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  )
}

DeckInfoCard.propTypes = {
  setSidebarOverlaid: PropTypes.func.isRequired,
  setDeckIndex: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deck: PropTypes.shape({
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
  }).isRequired,
  isSidebarOverlaid: PropTypes.bool.isRequired,
}

export default withRouter(
  connect(null, { setDeckIndex, removeDeck })(DeckInfoCard),
)
