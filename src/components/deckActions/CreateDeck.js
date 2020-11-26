import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Input from '../layout/Input'
import { addDeck } from '../../actions/decksPage'
import { getDeck } from '../../util/api'

const CreateDeck = ({ addDeck }) => {
  return (
    <div className='create-deck'>
      <h1 className='display-5 mb-1'>Create a new deck</h1>
      <p>Fill in details for your new deck!</p>
      <hr className='hr ml-0' />

      <Formik
        initialValues={{
          deckName: '',
          deckDesc: '',
        }}
        validationSchema={object({
          deckName: string()
            .max(50, "Mustn't exceed 50 characters")
            .required('Required'),
          deckDesc: string()
            .max(100, "Mustn't exceed 100 characters")
            .required('Required'),
        })}
        onSubmit={({ deckName, deckDesc }) => {
          addDeck({ ...getDeck(), name: deckName, desc: deckDesc })
        }}>
        {(formik) => (
          <Form
            className='create-deck__form form'
            onSubmit={formik.handleSubmit}>
            <Input
              label='Deck Name'
              name='deckName'
              type='text'
              placeholder='What do you want to call your deck?'
            />
            <Input
              label='Deck Description'
              name='deckDesc'
              type='text'
              placeholder="Describe how you'll use your this deck"
            />
            <Button
              variant='outline-danger'
              type='submit'
              className='px-4 mt-2 mb-3'
              disabled={formik.isSubmitting}>
              Create Deck
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

CreateDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
}

export default connect(null, { addDeck })(CreateDeck)
