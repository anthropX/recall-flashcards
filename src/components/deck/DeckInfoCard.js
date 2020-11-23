import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const DeckInfoCard = ({ history, deck: { name, desc, cards } }) => {
  const [confirmValue, setConfirmValue] = useState('')
  const [validated, setValidated] = useState(false)

  function handleChange(event) {
    setConfirmValue(event.target.value)
    setValidated(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() && confirmValue === name) {
      setValidated(true)
      history.push('/decks')
    }
  }

  function closeSidebar() {
    document
      .querySelector('.fluid-overlay')
      .classList.remove('fluid-overlay--overlaid')
  }

  function handleSidebarClick(event) {
    const { classList } = event.target
    if (
      classList.contains('fluid-overlay') ||
      classList.contains('aside__close') ||
      classList.contains('fa-times')
    )
      closeSidebar()
  }

  function showDelete() {
    document.querySelector('.fluid-box').classList.add('fluid-box--delete')
  }

  function hideDelete(event) {
    event.preventDefault()
    document.querySelector('.fluid-box').classList.remove('fluid-box--delete')
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className='deck-fluid-overlay fluid-overlay'
      onClick={handleSidebarClick}
      onWheel={closeSidebar}
      onTouchMove={closeSidebar}>
      <div className='fluid-box pl-md-3 pr-md-0' tabIndex='-1'>
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
                  to='/decks/0/update'
                  className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                  <i className='aside__icon fas fa-edit' />
                  <p className='p2 mt-2 mb-0'>Rename</p>
                </Link>
              </Col>
              <Col className='pl-0 pr-md-3 flex-grow-0'>
                <button
                  className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'
                  type='button'
                  onClick={showDelete}>
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail' className='mb-1'>
              <Form.Control
                type='text'
                value={confirmValue}
                onChange={handleChange}
                required
                isInvalid={confirmValue !== name}
                isValid={confirmValue === name}
              />
              <Form.Control.Feedback type='invalid'>
                Please type <strong>{name}</strong> to confirm
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant='outline-secondary'
              type='button'
              className='px-4 mt-2 mb-3 mr-2'
              onClick={hideDelete}>
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
}

export default withRouter(DeckInfoCard)
