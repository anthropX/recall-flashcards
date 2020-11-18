import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgressBar from 'react-bootstrap/ProgressBar'
import FlippableCard from './FlippableCard'
import Spinner from '../layout/Spinner'
import PlayAreaService from './PlayAreaService'
import { setBuckets } from '../../actions/decksPage'

const PlayArea = ({
  setBuckets,
  match: {
    params: { deckIndex },
  },
  decks,
}) => {
  const deck = decks[deckIndex]
  let card
  let cards
  let buckets
  let service

  if (deck) {
    service = new PlayAreaService(deck)
    card = service.getCard()
    cards = deck.cards
    buckets = deck.buckets
  }

  const handleCardFocus = () =>
    document
      .querySelector('.flippable-card')
      .classList.add('flippable-card__focus')

  const handleAffirmation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(true) })
    document
      .querySelector('.flippable-card')
      .classList.remove('flippable-card__focus')
  }
  const handleNegation = () => {
    setBuckets({ deckIndex, buckets: service.updateBuckets(false) })
    document
      .querySelector('.flippable-card')
      .classList.remove('flippable-card__focus')
  }

  const getProgressPercentage = () => {
    if (cards.length === 0) return 0
    return Math.floor((buckets.mastered.length / cards.length) * 100)
  }

  return deck ? (
    <div className='playarea'>
      <h1 className='display-5 mb-1 d-flex flex-wrap'>Playing {deck.name}</h1>
      <div className='cards__card pb-4 mt-3'>
        <div className='card__sides d-flex flex-column flex-lg-row mb-2'>
          <div className='card__side--transparent flippable-card-container mr-0 mr-md-3 mb-3 mb-lg-0 border-none'>
            <FlippableCard
              card={card}
              handleAffirmation={handleAffirmation}
              handleNegation={handleNegation}
              handleCardFocus={handleCardFocus}
            />
            <p className='p2 mt-3 mb-2 text-muted'>
              Mastered {buckets.mastered.length} of {cards.length} cards
            </p>
            <ProgressBar
              striped
              variant='danger'
              now={getProgressPercentage()}
              label={`${getProgressPercentage()}%`}
              srOnly={getProgressPercentage() < 6}
            />
            <p className='p2 my-2 text-muted'>
              Learning 18 of {cards.length} cards
            </p>
            <ProgressBar
              striped
              variant='secondary'
              now={getProgressPercentage()}
              label={`${getProgressPercentage()}%`}
              srOnly={getProgressPercentage() < 6}
              className='mb-3'
            />
          </div>
          <div className='card__side card-back d-none d-lg-flex flex-column invisible' />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

PlayArea.propTypes = {
  setBuckets: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { setBuckets })(PlayArea)
