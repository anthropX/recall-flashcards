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

      {decks.map(({ name }) => (
        <Col key={uuidv4()} lg='4' md='6' sm='4' xs='6'>
          <DeckGraphic name={name} />
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
      mastered: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = (state) => ({
  decks: state.decks,
})

export default connect(mapStateToProps)(Decks)
