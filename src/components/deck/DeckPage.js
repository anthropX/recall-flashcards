import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CardNew from './CardNew'
import Cards from './Cards'
import DeckInfoCard from './DeckInfoCard'
import Spinner from '../layout/Spinner'

const DeckPage = ({
  match: {
    params: { deckId },
  },
  decks,
}) => {
  const deck = decks.filter((deck) => deck.deckId === deckId)[0]
  const [isSidebarOverlaid, setSidebarOverlaid] = useState(false)
  return deck ? (
    <>
      <div className='deck-page d-flex flex-column flex-md-row'>
        <div className='deck-main flex-grow-1 mr-auto pr-0 pr-md-5' sm='auto'>
          <h1 className='display-5 mb-1 d-flex flex-wrap'>
            <span className='mr-4'>{deck.name} Deck</span>
            <button
              className='icon-button d-flex align-items-center d-md-none pl-0'
              onClick={() => setSidebarOverlaid(true)}
              type='button'>
              <i className='deck-main__icon fas fa-ellipsis-h my-3' />
            </button>
          </h1>
          <p className='p1 mb-0 pr-0 pr-md-5'>{deck.desc}</p>
          <CardNew deckId={deckId} />
        </div>
        <DeckInfoCard
          deck={deck}
          isSidebarOverlaid={isSidebarOverlaid}
          setSidebarOverlaid={setSidebarOverlaid}
        />
      </div>
      <Cards deckId={deckId} deckName={deck.name} cards={deck.cards} />
    </>
  ) : (
    <Spinner />
  )
}

DeckPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
  decks: state.decksPage.decks,
})

export default connect(mapStateToProps)(DeckPage)
