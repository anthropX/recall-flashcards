import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DeckInfo = ({ setDeleteVisible, deckId, name, desc, cards }) => {
  return (
    <>
      {name !== '' ? (
        <aside className='deck-infocard aside pl-md-3 pr-md-0'>
          <h6 className='h6 mt-0 d-md-none'>{name} Deck</h6>
          <div className='aside__close'>
            <i className='fas fa-times text-muted' />
          </div>
          <p className='p2 my-2 text-muted d-md-none'>({cards.length} cards)</p>

          <p className='p1 mt-3 mb-0 d-md-none'>{desc}</p>
          <hr className='hr hr--100 mt-2 mb-4 d-md-none ml-0' />
          <Row>
            <Col xs='3' md='4' className='pl-2 pr-0 flex-grow-0'>
              <Link
                to={`/decks/${deckId}/update`}
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'>
                <i className='aside__icon fas fa-edit' />
                <p className='p2 mt-2 mb-0'>Rename</p>
              </Link>
            </Col>
            <Col className='pl-0 pr-md-3 flex-grow-0'>
              <button
                className='aside__option text-decoration-none d-flex flex-column align-items-center p-2'
                type='button'
                onClick={() => setDeleteVisible(true)}>
                <i className='aside__icon fas fa-trash' />
                <p className='p2 mt-2 mb-0 text-nowrap'>Delete</p>
              </button>
            </Col>
          </Row>
        </aside>
      ) : null}
    </>
  )
}

DeckInfo.propTypes = {
  setDeleteVisible: PropTypes.func.isRequired,
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
}

export default DeckInfo
