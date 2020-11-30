import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import DeckNew from './DeckNew'
import DeckGraphic from './DeckGraphic'
import { setDeckId } from '../../actions/decksPage'

const Decks = ({ setDeckId, setSidebarOverlaid, selectedDeckId, decks }) => {
  const handleDeckGraphicFocus = (deckId) => {
    setSidebarOverlaid(true)
    setDeckId(deckId)
  }

  return (
    <Row className='decks'>
      <Col
        className='d-flex flex-column justify-content-center'
        key={uuidv4()}
        lg='4'
        md='6'
        sm='4'
        xs='6'>
        <DeckNew />
      </Col>

      {decks.map(({ deckId, name }) => (
        <Col key={uuidv4()} lg='4' md='6' sm='4' xs='6'>
          <DeckGraphic
            deckId={deckId}
            name={name}
            handleDeckGraphicFocus={handleDeckGraphicFocus}
            isDeckGraphicOpened={deckId === selectedDeckId}
          />
        </Col>
      ))}
    </Row>
  )
}

Decks.propTypes = {
  setDeckId: PropTypes.func.isRequired,
  setSidebarOverlaid: PropTypes.func.isRequired,
  selectedDeckId: PropTypes.string.isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
}

const mapStateToProps = (state) => ({
  selectedDeckId: state.decksPage.deckId,
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps, { setDeckId })(Decks)
