import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RenameDeck = () => {
  return (
    <div className='rename-deck'>
      <h1 className='display-5 mb-1'>Rename Deck</h1>
      <p>Fill in updated details for your deck!</p>
      <hr className='hr ml-0' />

      <Form className='rename-deck__form form'>
        <Form.Group controlId='form__name'>
          <Form.Label>Deck Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='What do you want to call your deck?'
          />
        </Form.Group>
        <Form.Group controlId='form__desc'>
          <Form.Label>Deck Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Describe how how’ll use your this deck'
          />
        </Form.Group>

        <Button
          variant='outline-danger'
          type='submit'
          className='px-4 mt-2 mb-3'>
          Update Deck
        </Button>
      </Form>
    </div>
  )
}

export default RenameDeck
