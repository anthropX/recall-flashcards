import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import DeckNew from './DeckNew'
import DeckGraphic from './DeckGraphic'

const Decks = ({ decks }) => {
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
          <DeckGraphic deckIndex={deckIndex} name={name} decks={decks} />
        </Col>
      ))}
    </Row>
  )
}

Decks.propTypes = {
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
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps)(Decks)
