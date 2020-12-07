import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const DeckDelete = ({
  setConfirmation,
  handleConfirmationSubmit,
  handleDeleteCancellation,
  name,
  comfirmation,
}) => {
  return (
    <aside className='decks-infocard aside pl-md-3 pr-md-0 d-flex flex-column'>
      <div className='aside__close'>
        <i className='fas fa-times text-muted' />
      </div>
      <p className='mr-5 mr-md-0'>
        Are you sure you want to{' '}
        <strong className='text-danger'>permanently delete</strong> this deck,
        including all cards and progress info?
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
          onClick={handleDeleteCancellation}>
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
  )
}

DeckDelete.propTypes = {
  setConfirmation: PropTypes.func.isRequired,
  handleConfirmationSubmit: PropTypes.func.isRequired,
  handleDeleteCancellation: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  comfirmation: PropTypes.string.isRequired,
}

export default DeckDelete
