import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import DeckNew from './DeckNew'
import DeckGraphic from './DeckGraphic'
import { setDeckIndex } from '../../actions/decksPage'

const Decks = ({
  setDeckIndex,
  setSidebarOverlaid,
  selectedDeckIndex,
  decks,
}) => {
  const handleDeckGraphicFocus = (deckIndex) => {
    setSidebarOverlaid(true)
    setDeckIndex(deckIndex)
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

      {decks.map(({ name }, deckIndex) => (
        <Col key={uuidv4()} lg='4' md='6' sm='4' xs='6'>
          <DeckGraphic
            deckIndex={deckIndex}
            name={name}
            handleDeckGraphicFocus={handleDeckGraphicFocus}
            isDeckGraphicOpened={deckIndex === selectedDeckIndex}
          />
        </Col>
      ))}
    </Row>
  )
}

Decks.propTypes = {
  setDeckIndex: PropTypes.func.isRequired,
  setSidebarOverlaid: PropTypes.func.isRequired,
  selectedDeckIndex: PropTypes.number.isRequired,
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
  selectedDeckIndex: state.decksPage.deckIndex,
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps, { setDeckIndex })(Decks)
