import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CardNew from './CardNew'
import Cards from './Cards'
import DeckInfoCard from './DeckInfoCard'
import Spinner from '../layout/Spinner'

const DeckPage = ({
  match: {
    params: { deckIndex },
  },
  decks,
}) => {
  const deck = decks[deckIndex]
  const handleClick = () => {
    document
      .querySelector('.fluid-overlay')
      .classList.add('fluid-overlay--overlaid')
    // Hide Reset
    document.querySelector('.fluid-box').classList.remove('fluid-box--delete')
  }
  return deck ? (
    <>
      <div className='deck-page d-flex flex-column flex-md-row'>
        <div className='deck-main flex-grow-1 mr-auto pr-0 pr-md-5' sm='auto'>
          <h1 className='display-5 mb-1 d-flex flex-wrap'>
            <span className='mr-4'>{deck.name} Deck</span>
            <button
              className='icon-button d-flex align-items-center d-md-none pl-0'
              onClick={handleClick}
              type='button'>
              <i className='deck-main__icon fas fa-ellipsis-h my-3' />
            </button>
          </h1>
          <p className='p1 mb-0 pr-0 pr-md-5'>{deck.desc}</p>
          <CardNew deckIndex={deckIndex} />
        </div>
        <DeckInfoCard deck={deck} />
      </div>
      <Cards deckIndex={deckIndex} deckName={deck.name} cards={deck.cards} />
    </>
  ) : (
    <Spinner />
  )
}

DeckPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckIndex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      mastered: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
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

export default connect(mapStateToProps)(DeckPage)
