import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateDeck = () => {
  return (
    <div className='create-deck'>
      <h1 className='display-5 mb-1'>Create a new deck</h1>
      <p>Fill in details for your new deck!</p>
      <hr className='hr ml-0' />

      <Form className='create-deck__form form'>
        <Form.Group controlId='form__name'>
          <Form.Label>Deck Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='What do you want to call your deck?'
            size='sm'
          />
        </Form.Group>
        <Form.Group controlId='form__desc'>
          <Form.Label>Deck Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Describe how how’ll use your this deck'
            size='sm'
          />
        </Form.Group>

        <Button
          variant='outline-danger'
          type='submit'
          className='px-4 mt-2 mb-3'>
          Create Deck
        </Button>
      </Form>
    </div>
  )
}

export default CreateDeck
