import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Input from '../layout/Input'
import { setDeck } from '../../actions/decksPage'

const RenameDeck = ({
  setDeck,
  match: {
    params: { deckIndex },
  },
  decks,
}) => {
  const deck = decks[deckIndex]
  return deck ? (
    <div className='rename-deck'>
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
          setDeck({ deckIndex: parseInt(deckIndex, 10), deckName, deckDesc })
        }}>
        {(formik) => (
          <Form
            className='rename-deck__form form'
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
              Update Deck
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  ) : null
}

RenameDeck.propTypes = {
  setDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, { setDeck })(RenameDeck)
