import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Prompt, withRouter } from 'react-router-dom'
import Input from '../layout/Input'
import { setDeck } from '../../actions/decks'
import processParams from '../layout/processParams'
import { showAlert } from '../../actions/alerts'
import FormikDirtyEffect from '../layout/FormikDirtyEffect'

const RenameDeck = ({ showAlert, setDeck, history, deckId, deck }) => {
  const [isDirty, setDirty] = useState(false)
  useEffect(() => {
    window.onbeforeunload = isDirty ? () => true : undefined
  })
  return deck ? (
    <div className='rename-deck'>
      <Prompt
        when={isDirty}
        message='You have unsaved changes, are you sure you want to leave?'
      />
      <h1 className='display-5 mb-1'>Rename Deck</h1>
      <p>Fill in updated details for your deck!</p>
      <hr className='hr ml-0' />

      <Formik
        initialValues={{
          deckName: deck.name,
          deckDesc: deck.desc,
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
          setDeck({ deckId, deckName, deckDesc })
          history.push(`/decks/${deckId}`)
          showAlert('success', `Deck details updated!`)
        }}>
        {(formik) => (
          <Form
            className='rename-deck__form form'
            onSubmit={formik.handleSubmit}>
            <FormikDirtyEffect onDirtyChange={(dirty) => setDirty(dirty)} />
            <Input
              as='textarea'
              rows={1}
              label='Deck Name'
              name='deckName'
              type='text'
              placeholder='What do you want to call your deck?'
            />
            <Input
              as='textarea'
              label='Deck Description'
              name='deckDesc'
              type='text'
              placeholder="Describe how you'll use your this deck"
            />
            <Button
              variant='outline-danger'
              type='submit'
              className='px-4 mt-2 mb-3'
              disabled={!formik.dirty || formik.isSubmitting}>
              Update Deck
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  ) : null
}

RenameDeck.propTypes = {
  showAlert: PropTypes.func.isRequired,
  setDeck: PropTypes.func.isRequired,
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
  connect(null, { showAlert, setDeck })(processParams(RenameDeck)),
)
